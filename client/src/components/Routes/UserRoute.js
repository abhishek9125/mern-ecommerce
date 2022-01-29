import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import History from '../../pages/user/History';

function UserRoute({ children, ...rest }) {

    const { user } = useSelector((state) => ({ ...state }));

    return (user && user.token ) ? (
        <Routes>
            <Route path="history" element={<History />} />
        </Routes>
    )  : ( 
        <LoadingToRedirect />
    ) 
}

export default UserRoute;
