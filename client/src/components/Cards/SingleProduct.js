import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Meta } = Card;

function SingleProduct({ product }) {

    const { title, description, slug, images } = product;

    return (
        <>
            <div className="col-md-7">

            </div>
            
            <div className="col-md-5">
                <Card
                    actions={[ 
                        <>
                            <ShoppingCartOutlined className="text-success" /> <br /> Add To Cart
                        </>,
                        <>
                            <HeartOutlined className="text-danger" /> <br /> Add To Wishlist
                        </>
                        // <Link to={`/product/${slug}`}>
                        //     <EyeOutlined className="text-warning" /> <br /> View Product
                        // </Link>,
                    ]}
                >
                    <Meta title={title} description={description} />
                </Card>
            </div>
        </>
    )
}

export default SingleProduct;
