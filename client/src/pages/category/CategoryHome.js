import React, { useState, useEffect } from 'react';
import { getCategory } from '../../functions/category';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../../components/Cards/ProductCard';

function CategoryHome() {

    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = useParams();

    useEffect(() => {
        setLoading(true);
        getCategory(slug)
        .then((c) => {
            setCategory(c.data);
        })
        setLoading(false);
    },[])

    return (
        <div>
            {slug}
        </div>
    )
}

export default CategoryHome;
