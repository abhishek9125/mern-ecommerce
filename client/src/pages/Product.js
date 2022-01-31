import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getProduct, getRelated, productStar } from '../functions/product';
import SingleProduct from '../components/Cards/SingleProduct';
import ProductCard from '../components/Cards/ProductCard';

function Product() {

    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [star, setStar] = useState(0);

    const { user } = useSelector((state) => ({ ...state }));
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
            setProduct(response.data);
            getRelated(response.data._id)
            .then((relatedResponse) => {
                setRelated(relatedResponse.data);
            })
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
            <div className="row pb-5 pl-8 pr-8">
                {
                    related.length ? 
                    related.map((p) => {
                        return (
                            <div key={p._id} className="col-md-4">
                                <ProductCard product={p} />
                            </div>
                        )
                    }) :
                    <div className="text-center col">No Products Found</div>
                }
            </div>
        </div>
    )
}

export default Product;
