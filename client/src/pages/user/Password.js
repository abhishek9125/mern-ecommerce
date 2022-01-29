import React, { useState } from 'react';
import { auth } from '../../firebase';
import { updatePassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import UserNav from '../../components/Navbar/UserNav';

function Password() {

    const [password, setPassword] = useState('abhishek');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let user = auth.currentUser;
        await updatePassword(user, password)
        .then(() => {
            setLoading(false);
            setPassword("");
            toast.success('Password Updated Successfully');
        })
        .catch((error) => {
            setLoading(false);
            toast.error(error.message)
        })
        setLoading(false);
    }

    const passwordUpdateForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Your Password</label>
                    <input 
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter New Password"
                        disabled={loading}
                        value={password}
                    />
                    <button className="btn btn-primary" disabled={password.length<6 || loading}>Submit</button>
                </div>
            </form>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row">

            <div className="col-md-2">
                <UserNav />
            </div>
            <div className="col">
                <h4>Password Update</h4>
                {passwordUpdateForm()}
            </div>
            </div>
        </div>
    )
}

export default Password;
