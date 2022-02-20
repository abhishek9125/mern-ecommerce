import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminNav from '../../components/Navbar/AdminNav';
import AdminOrderList from '../../components/Orders/AdminOrderList';
import { getOrders, changeStatus } from '../../functions/admin';


function AdminDashboard() {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({...state}));

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    },[])

    const loadOrders = () => {
        getOrders(user.token)
        .then((response) => {
            setOrders(response.data);
        })
    }

    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.token)
        .then((response) => {
            toast.success('Status Updated');
            loadOrders();
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Admin Dashboard</h4>
                    <AdminOrderList orders={orders} handleStatusChange={handleStatusChange} />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;
