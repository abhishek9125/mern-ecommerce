import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("abhishek40407@gmail.com");
    const [password, setPassword] = useState("abhishek");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                  email: user.email,
                  token: idTokenResult.token
                }
            });
            setLoading(false);
            toast.success('Login Successful');
            navigate('/');
        } catch (error) {
            console.log("Error : ",error);
            toast.error(error.message);
            setLoading(false);
        }
    }

    const loginForm = () => {
        return (
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email}
                        placeholder="Your Email"
                        onChange={e => setEmail(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password}
                        placeholder="Your Password"
                        onChange={e => setPassword(e.target.value)}
                        autoFocus
                    />
                </div>

                <Button 
                    onClick={handleSubmit}
                    type="primary"
                    className="mb-3"
                    shape="round"
                    block
                    icon={ loading ? <MailOutlined /> : <MailOutlined /> }
                    size="large"
                    disabled={!email || password.length < 6}
                >
                    Login with Email/Password
                </Button>

            </form>
        )
    }

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Login</h4>
                    {loginForm()}
                </div>
            </div>
        </div>
    )
}

export default Login;
