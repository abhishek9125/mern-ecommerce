import React, { useEffect, useState } from 'react';
import { getProduct } from '../functions/product';
import { useNavigate, useParams } from "react-router-dom";
import SingleProduct from '../components/Cards/SingleProduct';

function Product() {

    const [product, setProduct] = useState(null);
    const [star, setStar] = useState(0);
    
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        loadSingleProduct();
    }, [slug])

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
