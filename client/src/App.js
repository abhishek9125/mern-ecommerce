import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from './pages/Home';
import UserRoute from "./components/Routes/UserRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import Header from "./components/Navbar/Header";
import { currentUser } from './functions/auth';
import 'react-toastify/dist/ReactToastify.css';
import Product from "./pages/Product";
 
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
      <Header />
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:slug" element={<Product />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />  
        <Route exact path="/register/complete" element={<RegisterComplete />} />  
        <Route exact path="/forgot/password" element={<ForgotPassword />} />  
        <Route path="/user/*" element={<UserRoute />} />  
        <Route path="/admin/*" element={<AdminRoute />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
