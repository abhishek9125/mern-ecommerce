import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const { Meta } = Card;

function SingleProduct({ product }) {

    const { title, description, slug, images } = product;

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
