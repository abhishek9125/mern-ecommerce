import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubs } from '../../functions/sub';

function SubList() {

    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSubs().then((sub) => {
            setSubs(sub.data);
            setLoading(false);
        });
    }, [])

    const showSubs = () => {
        return (
            subs.map((sub) => {
                return (
                    <Link to={`/sub/${sub.slug}`} key={sub._id} className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
                        {sub.name}
                    </Link>
                )
            })
        )
    }

    return (
        <>
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                All Sub Categories
            </h4>
            <div className="container">
                <div className="row">
                    {showSubs()}
                </div>
            </div>
        </>
    )
}

export default SubList;
