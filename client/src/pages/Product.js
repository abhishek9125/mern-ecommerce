import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getProduct, productStar } from '../functions/product';
import SingleProduct from '../components/Cards/SingleProduct';

function Product() {

    const [product, setProduct] = useState(null);
    const [star, setStar] = useState(0);

    const { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        loadSingleProduct();
    }, [slug])

    useEffect(() => {
        if(product && product.ratings && user) {
            let existingRatingObject = product.ratings.find((item) => item.postedBy.toString() === user._id.toString());
            existingRatingObject && setStar(existingRatingObject.star);
        }
    }, [product, user])

    const loadSingleProduct = () => {
        getProduct(slug)
        .then((response) => {
            setProduct(response.data)
        })
        .catch((error) => {
            console.log('Error Fetching Product Data : ', error);
        })
    }

    const onStarClick = (newRating, name) => {
        setStar(newRating);
        productStar(name, newRating, user.token).then((response) => {})
        loadSingleProduct();
    }

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                {product && <SingleProduct product={product} onStarClick={onStarClick} star={star} />}
            </div>
            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr />
                    <h4>Related Products</h4>
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default Product;
