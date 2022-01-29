import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';
import AdminDashboard from '../../pages/admin/AdminDashboard';

function AdminRoute({ children, ...rest }) {

    const { user } = useSelector((state) => ({ ...state }));
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if(user && user.token) {
            currentAdmin(user.token)
            .then((response) => {
                setIsAdmin(true);
            })
            .catch((error) => {
                console.log('Error Validating Admin : ', error);
                setIsAdmin(false);
            })
        }
    },[user])

    return (isAdmin) ? (
        <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
        </Routes>
    )  : ( 
        <LoadingToRedirect />
    ) 
}

export default AdminRoute;
