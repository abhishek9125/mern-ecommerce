import React from 'react';
import { Card, Tabs } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import StarRating from 'react-star-ratings';
import laptop from '../../images/laptop.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from './ProductListItems';
import RatingModal from '../Modals/RatingModal';

const { TabPane } = Tabs;

function SingleProduct({ product }) {

    const { title, description, images, _id } = product;

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

                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Call us on 1234 9876 5476 to learn more about this Product.
                    </TabPane>
                </Tabs>
                    
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
                        </>,
                        <RatingModal>
                            <StarRating 
                                name={_id}
                                numberOfStars={5}
                                rating={2}
                                changeRating={(newRating, name) => {
        
                                }}
                                isSelectable={true}
                                starRatedColor="red"
                            />
                        </RatingModal>
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    )
}

export default SingleProduct;
