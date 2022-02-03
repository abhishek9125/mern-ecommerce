import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import ProductCardInCheckout from '../components/Cards/ProductCardInCheckout';


function Cart() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { slug } = useParams();
    const { user, cart } = useSelector((state) => ({ ...state }));

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + (nextValue.price * nextValue.count)
        },0);
    }

    const showCartItems = () => {
        return (
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Color</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Shipping</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                {
                    cart.map((product) => <ProductCardInCheckout key={product._id} product={product} />)
                }
            </table>
        )
    }

    const saveOrderToDb = () => {

    }

    const handleLoginClick = () => {
        navigate(`/login?path=/cart`);
    }

    return (
        <div className="container-fluid pt-2">

            <div className="row">
                <div className="col-md-8">
                    <h4>Cart / {cart.length} Products</h4>
                    {
                        !cart.length ? 
                        <p>No Products in Cart. <Link to='/shop'>Continue Shopping</Link></p> : 
                        showCartItems()
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
                        <button onClick={saveOrderToDb} className="btn btn-sn btn-primary btn-raised" disabled={!cart.length}>
                            Proceed To Checkout
                        </button> :
                        <button className="btn btn-sn btn-primary btn-raised" onClick={handleLoginClick}>
                            Login To Checkout
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart;