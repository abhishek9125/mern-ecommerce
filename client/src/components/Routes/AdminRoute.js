import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';
import AdminDashboard from '../../pages/admin/AdminDashboard';
import CategoryCreate from '../../pages/admin/category/CategoryCreate';
import CategoryUpdate from '../../pages/admin/category/CategoryUpdate';
import SubCreate from '../../pages/admin/sub/SubCreate';
import SubUpdate from '../../pages/admin/sub/SubUpdate';
import ProductCreate from '../../pages/admin/product/ProductCreate';
import AllProducts from '../../pages/admin/product/AllProducts';
import ProductUpdate from '../../pages/admin/product/ProductUpdate';
import CreateCouponPage from '../../pages/admin/coupon/CreateCouponPage';

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
            <Route path="category" element={<CategoryCreate />} />
            <Route path="category/:slug" element={<CategoryUpdate />} />
            <Route path="sub" element={<SubCreate />} />
            <Route path="sub/:slug" element={<SubUpdate />} />
            <Route path="product" element={<ProductCreate />} />
            <Route path="products" element={<AllProducts />} />
            <Route path="coupon" element={<CreateCouponPage />} />
            <Route path="product/:slug" element={<ProductUpdate />} />
        </Routes>
    )  : ( 
        <LoadingToRedirect />
    ) 
}

export default AdminRoute;
