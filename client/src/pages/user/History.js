import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import UserNav from '../../components/Navbar/UserNav';
import { getUserOrders } from '../../functions/user';
import ShowPaymentInfo from '../../components/Cards/ShowPaymentInfo';

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
                    <ShowPaymentInfo order={order} />
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

    const showOrderInTable = (order) => {
        return (
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Color</th>
                        <th scope="col">Count</th>
                        <th scope="col">Shipping</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        order.products.map((p,i) => {
                            return (
                                <tr key={i}>
                                    <td>
                                        <b>{p.product.title}</b>
                                    </td>
                                    <td>{p.product.price}</td>
                                    <td>{p.product.brand}</td>
                                    <td>{p.color}</td>
                                    <td>{p.count}</td>
                                    <td>{p.product.shipping == 'Yes' ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
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
