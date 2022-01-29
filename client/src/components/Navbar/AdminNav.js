import React from 'react';
import { Link } from 'react-router-dom';

function AdminNav() {
    return (
        <nav>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/product" className="nav-link">Create New Product</Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/products" className="nav-link">View All Products</Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/category" className="nav-link">Create New Category</Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/subcategory" className="nav-link">Create New Sub Category</Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/coupon" className="nav-link">Create New Coupon</Link>
                </li>
                <li className="nav-item">
                    <Link to="/user/password" className="nav-link">Change Password</Link>
                </li>
            </ul>
            
        </nav>
    )
}

export default AdminNav;
