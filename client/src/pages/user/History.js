import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import UserNav from '../../components/Navbar/UserNav';
import { getUserOrders } from '../../functions/user';

function History() {

    const [orders, setOrders] = useState([]);

    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({...state}));

    useEffect(() => {
        loadUserOrders();
    },[])

    const loadUserOrders = () => {
        getUserOrders(user.token)
        .then((response) => {
            setOrders(response.data);
        })
    }

    const showEachOrder = () => {
        return orders.map((order, i) => {
            return (
                <div key={i} className="m-5 p-3 card">
                    <p>Show Payment Information</p>
                    {showOrderInTable(order)}
                    <div className="row">
                        <div className="col">
                            <p>PDF Download</p>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const showOrderInTable = () => {
        return (
            <p>
                Each Order
            </p>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col text-center">
                    <h4>
                        { orders.length > 0 ? 'Your Purchased Orders' : 'No Orders Placed' }
                    </h4>
                    {showEachOrder()}
                </div>
            </div>
        </div>
    )
}

export default History;
