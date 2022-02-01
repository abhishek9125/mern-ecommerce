import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsByCount, fetchProductsByFilter  } from '../functions/product';
import ProductCard from '../components/Cards/ProductCard';
import LoadingCard from '../components/Cards/LoadingCard';

function Shop() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllProducts();
    },[])

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(12)
        .then((response) => {
            setProducts(response.data);
            setLoading(false);
        });
    }

    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts();
        }, 300);
        return () => clearTimeout(delayed);
    },[text])

    const fetchProducts = () => {
        setLoading(true);
        fetchProductsByFilter({ query: text }).then((response) => {
            setProducts(response.data);
        });
        setLoading(false);
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
