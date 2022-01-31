import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/category';

function CategoryList() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCategories().then((category) => {
            setCategories(category.data);
            setLoading(false);
        });
    }, [])

    const showCategories = () => {
        return (
            categories.map((category) => {
                return (
                    <Link to={`/category/${category.slug}`} key={category._id} className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
                        {category.name}
                    </Link>
                )
            })
        )
    }

    return (
        <>
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                All Categories
            </h4>
            <div className="container">
                <div className="row">
                    {showCategories()}
                </div>
            </div>
        </>
    )
}

export default CategoryList;
