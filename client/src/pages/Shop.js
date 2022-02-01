import React, { useState, useEffect } from 'react';
import { getProductsByCount } from '../functions/product';
import ProductCard from '../components/Cards/ProductCard';
import LoadingCard from '../components/Cards/LoadingCard';

function Shop() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    },[])

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(12)
        .then((response) => {
            setProducts(response.data);
            setLoading(false);
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    Search / Filter
                </div>
                <div className="col-md-9">
                    <h4 className="text-danger">All Products</h4>
                    { products.length < 1 && <p>No Products Found</p> }
                    <div className="row">
                        {
                            products.map((product) => {
                                return (
                                    <div className="col-md-4 mt-3" key={product._id}>
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
            </div>
        </div>
    )
}

export default Shop;
