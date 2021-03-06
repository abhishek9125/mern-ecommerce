import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from '../../functions/auth';

function RegisterComplete() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"));
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!email || !password) {
            toast.error("Email and Password are Required.");
            return;
        }

        if(password.length < 6) {
            toast.error("Password must be atleast 6 characters long.");
            return;
        }

        try {
            const result = await signInWithEmailLink(auth, email, window.location.href);
            if(result.user.emailVerified) {
                window.localStorage.removeItem("emailForRegistration");
                
                let user = auth.currentUser;
                await updatePassword(user, password);
                const idTokenResult = await user.getIdTokenResult();
                createOrUpdateUser(idTokenResult.token)
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
                .catch((error) => console.log('Error In Registering : ', error));
                navigate('/');
            }
        } catch(error) {
            console.log(`Error in Registration`, error)
            toast.error(error.message)
        }

    }

    const completeRegistrationForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    className="form-control" 
                    value={email}
                    disabled
                />

                <br />

                <input 
                    type="text" 
                    className="form-control" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
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
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete;
