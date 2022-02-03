import React from 'react';
import ModalImage from 'react-modal-image';
import laptop from '../../images/laptop.png';
import { useSelector, useDispatch } from 'react-redux';

function ProductCardInCheckout({ product }) {

    const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
    const dispatch = useDispatch();

    const handleColorChange = (e) => {
        let cart = [];
        if(typeof window != 'undefined') {
            let cartData = localStorage.getItem('cart');
            if(cartData) {
                cart = JSON.parse(cartData);
            }

            cart.map((p,i) => {
                if(product._id == p._id) {
                    cart[i].color = e.target.value;
                }
            })

            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            });
        }
    }

    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: '100px', height: 'auto' }}>
                        {
                            product.images.length ? 
                            <ModalImage 
                                small={product.images[0].url}
                                large={product.images[0].url}
                            /> :
                            <ModalImage 
                                small={laptop}
                                large={laptop}
                            />
                        }
                    </div>
                </td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.brand}</td>
                <td>
                    <select
                        name="color"
                        className="form-control"
                        onChange={handleColorChange}
                    >
                        {product.color ? <option value={product.color}>{product.color}</option> : <option>Select</option>}
                        {
                            colors.filter((c) => c != product.color).map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))
                        }
                    </select>
                </td>
                <td>{product.count}</td>
                <td>Shipping</td>
                <td>Remove</td>
            </tr>
        </tbody>
    )
}

export default ProductCardInCheckout;
