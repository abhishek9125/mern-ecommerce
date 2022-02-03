import React from 'react';
import ModalImage from 'react-modal-image';
import laptop from '../../images/laptop.png';
import { useDispatch } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

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

    const handleQuantityChange = (e) => {
        e.preventDefault();
        let count = e.target.value < 1 ? 1 : e.target.value;
        if(count > 10) {
            if(count > product.quantity) {
                toast.error(`Only ${product.quantity} Items are available in stock.`);
                return;
            }
            toast.error('You can not add more that 10 Items of Same Product.');
            return;
        }
        let cart = [];
        if(typeof window != 'undefined') {
            let cartData = localStorage.getItem('cart');
            if(cartData) {
                cart = JSON.parse(cartData);
            }

            cart.map((p,i) => {
                if(product._id == p._id) {
                    cart[i].count = count;
                }
            })

            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            });
        }
    }

    const handleRemove = () => {
        let cart = [];
        if(typeof window != 'undefined') {
            let cartData = localStorage.getItem('cart');
            if(cartData) {
                cart = JSON.parse(cartData);
            }

            cart.map((p,i) => {
                if(product._id === p._id) {
                    cart.splice(i,1);
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
                <td className="text-center">
                    <input 
                        type="number"
                        value={product.count}
                        className="form-control"
                        onChange={handleQuantityChange}
                    />
                </td>
                <td className="text-center">
                    {
                        product.shipping === 'Yes' ?
                        <CheckCircleOutlined className="text-success" /> :
                        <CloseCircleOutlined className="text-danger" />
                    }
                </td>
                <td className="text-center">
                    <CloseOutlined onClick={handleRemove} className="text-danger pointer" />
                </td>
            </tr>
        </tbody>
    )
}

export default ProductCardInCheckout;
