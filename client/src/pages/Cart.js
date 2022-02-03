import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


function Cart() {


    const dispatch = useDispatch();
    const { user, cart } = useSelector((state) => ({ ...state }));


    return (
        <div className="container-fluid">
            <div className="row">
                <h4>Cart</h4>
                
            </div>
        </div>
    )
}

export default Cart;
