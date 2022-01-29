import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import History from '../../pages/user/History';

function UserRoute({ children, ...rest }) {

    const { user } = useSelector((state) => ({ ...state }));

    return (user && user.token ) ? (
        <Routes>
            <Route path="history" element={<History />} />
        </Routes>
    )  : ( 
        <h1 className="text-danger" >Loading...</h1> 
    ) 
}

export default UserRoute;
