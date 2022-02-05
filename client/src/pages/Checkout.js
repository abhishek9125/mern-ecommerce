import React, { useEffect, useState } from 'react';
import { getUserCart, emptyUserCart, saveUserAddress } from '../functions/user';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function Checkout() {

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        getUserCart(user.token)
        .then((response) => {
            setProducts(response.data.products);
            setTotal(response.data.cartTotal);
        })
    }, [])

    const saveAddressToDb = () => {

    }

    const emptyCartHandler = () => {
        if(typeof window != 'undefined') {
            localStorage.removeItem('cart');
        }

        dispatch({
            type: 'ADD_TO_CART',
            payload: []
        });

        emptyUserCart(user.token)
        .then((response) => {
            setProducts([]);
            setTotal(0);
            toast.success('Items Removed from Cart Successfully..!!');
        })
    }

    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br />
                <br />
                Textarea
                <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
                    Save
                </button>
                <hr />
                <h4>Got Coupon?</h4>
                <br />
                Coupon Feature
            </div>
            <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr />
                <p>Products {products.length}</p>
                <hr />
                {
                    products.map((p,i) => (
                        <div key={i}>
                            {p.product.title} ({p.color}) x {p.count} = {p.product.price * p.count}
                        </div>
                    ))
                }
                <hr />
                <p>Cart Total : ${total}</p>

                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-primary">
                            Place Order
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-primary" onClick={emptyCartHandler} disabled={!products.length}>
                            Empty Cart
                        </button>
                    </div>
                </div>
            </div>  

        </div>
    )
}

export default Checkout;
