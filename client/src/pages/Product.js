import React, { useEffect, useState } from 'react';
import { getProduct } from '../functions/product';
import { useNavigate, useParams } from "react-router-dom";

function Product() {

    const [product, setProduct] = useState({});

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
        <div>
            {product.title}
        </div>
    )
}

export default Product;
