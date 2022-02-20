import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import ShowPaymentInfo from '../Cards/ShowPaymentInfo';

function AdminOrderList({ orders, handleStatusChange }) {

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
        <>
            {
                orders.map((order) => {
                    return (
                        <div key={order._id} className="row pb-5">
                            <div className="btn btn-block bg-light">
                                <ShowPaymentInfo order={order} />
                                <div className="row">
                                    <div className="col-md-4">
                                        Delivery Status
                                    </div>
                                    <div className="col-md-8">
                                        <select
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            className="form-control"
                                            defaultValue={order.orderStatus}
                                            name="status"
                                        >
                                            <option value="Not Processed">Not Processed</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Dispatched">Dispatched</option>
                                            <option value="Cancelled">Cancelled</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {showOrderInTable(order)}
                        </div>
                    )
                })
            }
        </>
    )
}

export default AdminOrderList;
