import React from 'react';

function ShowPaymentInfo({ order }) {
    return (
        <div>
            <p>
                {/* <span>Order ID: {order.paymentIntent.id}</span>{" / "} */}
                <span>
                    Amount: {((order.paymentIntent.amount/100).toFixed(2)).toLocaleString("en-US", {
                        style: 'currency',
                        currency: 'INR'
                    })}
                </span>{" / "}
                {/* <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>{" / "} */}
                <span>Method: {order.paymentIntent.payment_method_types[0]}</span>{" / "}
                <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>{" / "}
                <span>Ordered On: {new Date(order.paymentIntent.created * 1000).toLocaleString()}</span>{" / "}
                <span className="badge bg-primary text-white">Status: {order.orderStatus}</span>
            </p>
        </div>
    )
}

export default ShowPaymentInfo;
