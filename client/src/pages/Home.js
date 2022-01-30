import React, { useState, useEffect } from 'react';
import Jumbotron from '../components/Cards/Jumbotron';
import LoadingCard from '../components/Cards/LoadingCard';
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
            <div className="jumbotron text-center font-weight-bold text-danger h1">
                <Jumbotron 
                    text={['Latest Products', 'Best Sellers', 'New Arrivals']}
                />
            </div>
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

export default Home;
