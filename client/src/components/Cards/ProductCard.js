import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.png';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';

const { Meta } = Card;

function ProductCard({ product }) {

    const { title, description, images, slug, price } = product;

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
                    <div onClick={handleAddToCart}>
                        <ShoppingCartOutlined className="text-danger" /> <br /> Add To Cart
                    </div>
                ]}
                className="mb-2"
                >
                <Meta title={`${title} - $${price}`} description={`${description && description.substring(0, 30)}...`} />
            </Card>
        </>
    )
}

export default ProductCard;