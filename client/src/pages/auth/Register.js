import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Register() {

    const [email, setEmail] = useState("abhishek40407@gmail.com");

    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if(user && user.token) {
            navigate('/');
        }
    },[user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }
        await sendSignInLinkToEmail(auth, email, config);
        toast.success(`Email is sent to ${email}. Click the link to complete your registration.`);
        window.localStorage.setItem('emailForRegistration', email);
        setEmail('');
    }

    const registerForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    className="form-control" 
                    value={email}
                    placeholder="Your Email"
                    onChange={e => setEmail(e.target.value)}
                    autoFocus
                />

                <br />

                <button type="submit" className="btn btn-raised">
                    Register
                </button>

            </form>
        )
    }

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}

export default Register;
