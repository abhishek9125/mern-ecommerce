import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import laptop from '../../images/laptop.png';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Meta } = Card;

function ProductCard({ product }) {

    const { title, description, images, slug } = product;

    return (
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
                <>
                    <ShoppingCartOutlined className="text-danger" /> <br /> Add To Cart
                </>
            ]}
            className="mb-2"
        >
            <Meta title={title} description={`${description && description.substring(0, 30)}...`} />
        </Card>
    )
}

export default ProductCard;