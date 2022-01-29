import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from 'firebase/auth';

function ForgotPassword() {

    const [email, setEmail] = useState('abhishek40407@gmail.com');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if(user && user.token) {
            navigate('/');
        }
    },[user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true
        }
        await sendPasswordResetEmail(auth, email, config)
        .then(() => {
            setEmail('');
            setLoading(false);
            toast.success('Email sent for New Password');
        })
        .catch((error) => {
            setLoading(false);
            toast.error(error.message);
            console.log('Error Generating New Password : ', error);
        });
    }

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            <h4>Forgot Password</h4>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Type your Email"
                    autoFocus
                />
                <br />
                <button className="btn btn-raised" disabled={!email || loading}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword;
