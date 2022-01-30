import React, { useState, useEffect } from 'react';
import Jumbotron from '../Cards/Jumbotron';
import LoadingCard from '../Cards/LoadingCard';
import ProductCard from '../Cards/ProductCard';
import { getProducts } from '../../functions/product';

function NewArrivals() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, [])

    const loadAllProducts = () => {
        setLoading(true);
        getProducts('createdAt', 'desc', 3)
        .then((response) => {
            setProducts(response.data);
        })
        setLoading(false);
    }

    return (
        <>
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                New Arrivals
            </h4>
            <div className="container">
                <div className="row">
                    {
                        products.map((product) => {
                            return (
                                <div className="col-md-4" key={product._id}>
                                    {
                                        loading ?
                                        <LoadingCard /> : 
                                        <ProductCard product={product} />
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default NewArrivals;
