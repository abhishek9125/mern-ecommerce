import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


function Cart() {

    const dispatch = useDispatch();
    const { user, cart } = useSelector((state) => ({ ...state }));

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + (nextValue.price * nextValue.count)
        },0);
    }

    return (
        <div className="container-fluid pt-2">

            <div className="row">
                <div className="col-md-8">
                    <h4>Cart / {cart.length} Products</h4>
                    {
                        !cart.length ? 
                        <p>No Products in Cart. <Link to='/shop'>Continue Shopping</Link></p> : 
                        <div>Show Cart Items</div>
                    }
                </div>
                <div className="col-md-4">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Products</p>
                    {
                        cart.map((c,i) => {
                            return (
                                <div key={i}>
                                    <p>
                                        {c.title} x {c.count} = ${c.price * c.count}
                                    </p>
                                </div>
                            )
                        })
                    }
                    <hr />
                    Total: <b>${getTotal()}</b>
                    <hr />
                    {
                        user ? 
                        <button className="btn btn-sn btn-primary btn-raised">
                            Proceed To Checkout
                        </button> :
                        <button className="btn btn-sn btn-primary btn-raised">
                            Login To Checkout
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart;
