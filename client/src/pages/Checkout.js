import React, { useEffect, useState } from 'react';
import { getUserCart, emptyUserCart, saveUserAddress } from '../functions/user';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Checkout() {

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState('');
    const [addressSaved, setAddressSaved] = useState(false);

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
        saveUserAddress(address, user.token)
        .then((response) => {
            if(response.data.ok) {
                setAddressSaved(true);
                toast.success('Address Saved');
            }
        })
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
                <ReactQuill 
                    theme="snow"
                    value={address}
                    onChange={setAddress}
                />
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
                        <button className="btn btn-primary" disabled={!addressSaved || !products.length}>
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
