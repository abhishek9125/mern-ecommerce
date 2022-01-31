import React, { useEffect, useState } from 'react';
import { getProduct } from '../functions/product';
import { useNavigate, useParams } from "react-router-dom";
import SingleProduct from '../components/Cards/SingleProduct';

function Product() {

    const [product, setProduct] = useState(null);

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

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                {product && <SingleProduct product={product} />}
            </div>
        </div>
    )
}

export default Product;
