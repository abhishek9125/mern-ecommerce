import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { GoogleOutlined, MailOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { createOrUpdateUser } from '../../functions/auth';

function Login() {

    const [email, setEmail] = useState("abhishek40407@gmail.com");
    const [password, setPassword] = useState("abhishek");
    const [loading, setLoading] = useState(false);

    let [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const roleBasedRedirection = (response) => {
        let path = searchParams.get("path");
        if(path) {
            navigate(path);
        } else {
            if(response.data.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/history');
            }
        }
    }

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        let path = searchParams.get("path");
        if(!path) {
            if(user && user.token) {
                navigate('/');
            }
        }
    },[user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const { user } = result;
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
                roleBasedRedirection(response);
            })
            .catch((error) => console.log('Error Logging In : ', error));
            setLoading(false);
            toast.success('Login Successful');
        } catch (error) {
            console.log("Error : ",error);
            toast.error(error.message);
            setLoading(false);
        }
    }

    const googleLogin = async () => {
        signInWithPopup(auth, googleAuthProvider)
        .then(async (result) => {
            const { user } = result;
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
                roleBasedRedirection(response);
            })
            .catch((error) => console.log('Error Logging In : ', error));
            toast.success('Login Successful');
        })
        .catch((error) => {
            console.log("Error : ",error);
            toast.error(error.message);
        });
    }

    const loginForm = () => {
        return (
            <form>

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
                    shape="round"
                    block
                    icon={ loading ? <LoadingOutlined /> : <MailOutlined /> }
                    size="large"
                    disabled={!email || password.length < 6 || loading}
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

                    <Button
                        onClick={googleLogin}
                        type="danger"
                        className="mb-3"
                        block
                        shape="round"
                        icon={ <GoogleOutlined /> }
                        size="large"
                    >
                        Login With Google
                    </Button>

                    <Link to="/forgot/password" className="float-right text-danger">
                        Forgot Password
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Login;
