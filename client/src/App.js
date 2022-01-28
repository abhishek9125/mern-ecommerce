import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Home from './pages/Home';
import Header from "./components/Navbar/Header";
import 'react-toastify/dist/ReactToastify.css';
 
function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />  
        <Route exact path="/register/complete" element={<RegisterComplete />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
