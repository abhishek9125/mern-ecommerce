import React, { useState, useEffect } from 'react';
import { getCategory } from '../../functions/category';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../../components/Cards/ProductCard';
import LoadingCard from '../../components/Cards/LoadingCard';

function CategoryHome() {

    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = useParams();

    useEffect(() => {
        setLoading(true);
        getCategory(slug)
        .then((response) => {
            setCategory(response.data.category);
            setProducts(response.data.products)
        })
        setLoading(false);
    },[])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                        {products.length} Products in "{category.name}" Category
                    </h4>
                </div>
            </div>
            <div className="row">
                {
                    products.map((product) => {
                        return (
                            <div className="col-md-4">
                                {loading ?
                                    <LoadingCard /> : 
                                    <ProductCard product={product} />
                                }
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default CategoryHome;
