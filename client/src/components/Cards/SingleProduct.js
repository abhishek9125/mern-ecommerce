import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from './ProductListItems';

function SingleProduct({ product }) {

    const { title, images } = product;

    return (
        <>
            <div className="col-md-7">
                {
                    images && images.length ?
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                        { images && images.map((image) => {
                            return (
                                <img src={image.url} id={image.public_id} height="50px" />
                            )
                        })}
                    </Carousel> :
                    <Card
                        cover={
                            <img 
                                src={laptop}
                                style={{ height: '450px', objectFit: 'cover' }}
                                className="p-1"
                            />
                        }
                    >
                    </Card>
                }
                    
            </div>
            
            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>
                <Card
                    actions={[ 
                        <>
                            <ShoppingCartOutlined className="text-success" /> <br /> Add To Cart
                        </>,
                        <>
                            <HeartOutlined className="text-danger" /> <br /> Add To Wishlist
                        </>
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    )
}

export default SingleProduct;
