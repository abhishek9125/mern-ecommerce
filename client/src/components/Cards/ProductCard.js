import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.png';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';

const { Meta } = Card;

function ProductCard({ product }) {
    
    const [toolTip, setToolTip] = useState('Click to Add Product');
    const { title, description, images, slug, price } = product;

    const dispatch = useDispatch();
    const { user, cart } = useSelector((state) => ({ ...state }));

    const handleAddToCart = () => {
        let cart = [];
        if(typeof window != 'undefined') {
            let cartData = localStorage.getItem('cart');
            if(cartData) {
                cart = JSON.parse(cartData);
            }
            cart.push({ ...product, count: 1 });
            let uniqueCartArray = _.uniqWith(cart, _.isEqual);
            localStorage.setItem('cart', JSON.stringify(uniqueCartArray));
            setToolTip('Added To Cart');
            dispatch({
                type: 'ADD_TO_CART',
                payload: uniqueCartArray
            });
            dispatch({
                type: 'SET_VISIBLE',
                payload: true
            });
        }
    }

    

    return (
        <>
            {   
                product && product.ratings && product.ratings.length > 0 ? 
                showAverage(product) : 
                <div className="text-center pt-1 pb-3">No Ratings Yet</div>
            }
            <Card
                cover={
                    <img 
                        src={images && images.length ? images[0].url : laptop}
                        style={{ height: '150px', objectFit: 'cover' }}
                        className="p-1"
                    />
                }
                actions={[ 
                    <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-warning" /> <br /> View Product
                    </Link>,
                    <Tooltip title={toolTip}>
                        <div onClick={handleAddToCart} disabled={product.quantity < 1}>
                            <ShoppingCartOutlined className="text-danger" /> <br /> 
                            {product.quantity < 1 ? 'Out Of Stock' : 'Add To Cart'}
                        </div>
                    </Tooltip>

                ]}
                className="mb-2"
                >
                <Meta title={`${title} - $${price}`} description={`${description && description.substring(0, 30)}...`} />
            </Card>
        </>
    )
}

export default ProductCard;