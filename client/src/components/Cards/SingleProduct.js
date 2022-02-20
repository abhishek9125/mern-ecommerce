import React, { useState } from 'react';
import { Card, Tabs, Tooltip } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import StarRating from 'react-star-ratings';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import laptop from '../../images/laptop.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from './ProductListItems';
import RatingModal from '../Modals/RatingModal';
import { showAverage } from '../../functions/rating';
import { addToWishlist } from '../../functions/user';
import { toast } from 'react-toastify';

const { TabPane } = Tabs;

function SingleProduct({ product, onStarClick, star }) {

    const { title, description, images, _id } = product;

    const [toolTip, setToolTip] = useState('Click to Add Product');

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

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        addToWishlist(product._id, user.token)
        .then((response) => {
            toast.success('Added To Wishlist');
        })
    }

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
                {   
                    product && product.ratings && product.ratings.length > 0 ? 
                    showAverage(product) : 
                    <div className="text-center pt-1 pb-3">No Ratings Yet</div>
                }
                <Card
                    actions={[ 
                        <Tooltip title={toolTip}>
                            <div onClick={handleAddToCart}>
                                <ShoppingCartOutlined className="text-danger" /> <br /> Add To Cart
                            </div>
                        </Tooltip>,
                        <a onClick={handleAddToWishlist}>
                            <HeartOutlined className="text-danger" /> <br /> Add To Wishlist
                        </a>,
                        <RatingModal>
                            <StarRating 
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
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
