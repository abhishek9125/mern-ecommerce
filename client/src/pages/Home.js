import React, { useState, useEffect } from 'react';
import ProductCard from '../components/Cards/ProductCard';
import { getProductsByCount } from '../functions/product';

function Home() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, [])

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(3)
        .then((response) => {
            setProducts(response.data);
        })
        setLoading(false);
    }

    return (
        <>
            <div className="jumbotron">
                All Products
            </div>
            <div className="container">
                <div className="row">
                    {
                        products.map((product) => {
                            return (
                                <div className="col-md-4" key={product._id}>
                                    <ProductCard product={product} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Home;
