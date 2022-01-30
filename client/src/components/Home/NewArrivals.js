import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import LoadingCard from '../Cards/LoadingCard';
import ProductCard from '../Cards/ProductCard';
import { getProducts, getProductsCount } from '../../functions/product';

function NewArrivals() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadAllProducts();
    }, [page])

    useEffect(() => {
        getProductsCount()
        .then((response) => {
            setProductsCount(response.data);
        })
        .catch((error) => {
            console.log('Error Fetching Product Count : ', error);
        })
    }, [])

    const loadAllProducts = () => {
        setLoading(true);
        getProducts('createdAt', 'desc', page)
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
                <div className="row">
                    <nav className="col-md-4 offset-md-4 text-center pt-3 p-3">
                        <Pagination 
                            current={page}
                            total={Math.ceil((productsCount/3)) * 10}
                            onChange={(value) => {setPage(value); console.log(value)}}
                        />
                    </nav>
                </div>
            </div>
        </>
    )
}

export default NewArrivals;
