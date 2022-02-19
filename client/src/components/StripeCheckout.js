import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createPaymentIntent } from '../functions/stripe';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import { createOrder, emptyUserCart } from '../functions/user';
import Laptop from '../images/laptop.png'

function StripeCheckout() {

    const dispatch = useDispatch();
    const { user, coupon } = useSelector((state) => ({...state}));

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");
    const [cartTotal, setCartTotal] = useState(0);
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [payable, setPayable] = useState(0);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        createPaymentIntent(user.token, coupon)
        .then((response) => {
            setClientSecret(response.data.clientSecret);
            setCartTotal(response.data.cartTotal);
            setTotalAfterDiscount(response.data.totalAfterDiscount);
            setPayable(response.data.payable);
        })
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.name.value
                }
            }
        });

        if(payload.error) {
            setError(`Payment Failed : ${payload.error.message}`);
        } else {
            createOrder(payload, user.token)
            .then((response) => {
                if(response.data.ok) {
                    if( typeof window !== "undefined" ) localStorage.removeItem('cart');

                    dispatch({
                        type: 'ADD_TO_CART',
                        payload: [],
                    });

                    dispatch({
                        type: 'COUPON_APPLIED',
                        payload: false,
                    });

                    emptyUserCart(user.token);
                }
            })
            setError(null);
            setSucceeded(true);
        }
        setProcessing(false);

    }

    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    const cartStyle = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: "Arial, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#32325d",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      };

    return (
        <>
            {
                !succeeded &&
                <div>
                    {coupon && totalAfterDiscount !== undefined ?
                        <p className="alert alert-success">{`Total After Discount: $${totalAfterDiscount}`}</p> :
                        <p className="alert alert-danger">No Coupon Applied</p>
                    }
                </div>
            }

            <div className="text-center pb-5">
                <Card 
                    cover={
                        <img 
                            src={Laptop}
                            style={{
                                height: '200px',
                                objectFit: 'cover',
                                marginBottom: '-50px'
                            }}
                        />
                    }
                    actions={[
                        <>
                            <DollarOutlined className="text-info" /> Total: $
                            {cartTotal}
                        </>,
                        <>
                            <CheckOutlined className="text-info" /> Total Payable: $
                            {(payable / 100).toFixed(2)}
                        </>
                    ]}
                />
            </div>

            <form
                id="payemnt-form"
                className="stripe-form"
                onSubmit={handleSubmit}
            >
                <CardElement  
                    id="card-element"
                    options={cartStyle}
                    onChange={handleChange}
                />
                <button
                    className="stripe-button"
                    disabled={processing || disabled || succeeded}
                >
                    <span id="button-text">
                        {
                            processing ?
                            <div className="spinner" id="spinner"></div> :
                            "Place Order"
                        }
                    </span>
                </button>
                
                <br />
                
                {
                    error &&
                    <div className="card-error" role="alert">
                        {error}
                    </div>
                }

                <br />

                <p className={succeeded ? "result-message" : "result-message hidden"}>
                    Payment Successful.{" "}
                    <Link to="/user/history">See it in your Purchase History.</Link>
                </p>
            </form>
        </>
    )
}

export default StripeCheckout;
