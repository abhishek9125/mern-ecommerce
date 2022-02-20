import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { LoadingOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';

const Login = lazy(() =>  import('./pages/auth/Login'));
const Register = lazy(() =>  import('./pages/auth/Register'));
const RegisterComplete = lazy(() =>  import('./pages/auth/RegisterComplete'));
const ForgotPassword = lazy(() =>  import("./pages/auth/ForgotPassword"));
const Home = lazy(() =>  import('./pages/Home'));
const UserRoute = lazy(() =>  import("./components/Routes/UserRoute"));
const AdminRoute = lazy(() =>  import("./components/Routes/AdminRoute"));
const Header = lazy(() =>  import("./components/Navbar/Header"));
const { currentUser } = lazy(() =>  import('./functions/auth'));
const Product = lazy(() =>  import("./pages/Product"));
const CategoryHome = lazy(() =>  import("./pages/category/CategoryHome"));
const SubHome = lazy(() =>  import("./pages/sub/SubHome"));
const Shop = lazy(() =>  import("./pages/Shop"));
const Cart = lazy(() =>  import("./pages/Cart"));
const SideDrawer = lazy(() =>  import("./components/Drawer/SideDrawer"));
const Checkout = lazy(() =>  import("./pages/Checkout"));
const Payment = lazy(() =>  import("./pages/Payment"));
 
function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
        .then((response) => {
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                    name: response.data.name,
                    email: response.data.email,
                    role: response.data.role,
                    _id: response.data._id,
                    token: idTokenResult.token
                }
            });
        })
        .catch((error) => console.log('Error In Fetching User Data : ', error));
      }
    })
    return () => unsubscribe();
  },[])

  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="col text-center p-5"> 
          <LoadingOutlined />
        </div>
      }>
        <Header />
        <SideDrawer />
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:slug" element={<Product />} />
          <Route exact path="/category/:slug" element={<CategoryHome />} />
          <Route exact path="/sub/:slug" element={<SubHome />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />  
          <Route exact path="/shop" element={<Shop />} />  
          <Route exact path="/cart" element={<Cart />} />  
          <Route exact path="/checkout" element={<Checkout />} />  
          <Route exact path="/payment" element={<Payment />} />  
          <Route exact path="/register/complete" element={<RegisterComplete />} />  
          <Route exact path="/forgot/password" element={<ForgotPassword />} />  
          <Route path="/user/*" element={<UserRoute />} />  
          <Route path="/admin/*" element={<AdminRoute />} />  
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
