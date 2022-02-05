import React, { useEffect, useState } from 'react';
import { getUserCart } from '../functions/user';
import { useSelector, useDispatch } from 'react-redux';

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
                <p>Products X</p>
                <hr />
                <p>List of Products</p>
                <hr />
                <p>Cart Total : $X</p>

                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-primary">
                            Place Order
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-primary">
                            Empty Cart
                        </button>
                    </div>
                </div>
            </div>  

        </div>
    )
}

export default Checkout;
