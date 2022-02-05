import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import History from '../../pages/user/History';
import Password from '../../pages/user/Password';
import Wishlist from '../../pages/user/Wishlist';
import Payment from '../../pages/Payment';

function UserRoute({ children, ...rest }) {

    const { user } = useSelector((state) => ({ ...state }));

    return (user && user.token ) ? (
        <Routes>
            <Route path="history" element={<History />} />
            <Route path="password" element={<Password />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="payment" element={<Payment />} />
        </Routes>
    )  : ( 
        <LoadingToRedirect />
    ) 
}

export default UserRoute;
