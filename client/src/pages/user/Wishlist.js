import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import UserNav from '../../components/Navbar/UserNav';
import { getWishlist, removeFromWishlist } from '../../functions/user';
import { DeleteOutlined } from '@ant-design/icons'

function Wishlist() {


    const [wishlist, setWishlist] = useState([]);

    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({...state}));

    useEffect(() => {
        loadWishlist();
    },[])

    const loadWishlist = () => {
        getWishlist(user.token)
        .then((response) => {
            setWishlist(response.data.wishlist);
        })
    }

    const handleRemoveFromWishlist = (productId) => {
        removeFromWishlist(productId, user.token)
        .then((response) => {
            loadWishlist();
            toast.success('Item Removed From Wishlist');
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">

            <div className="col-md-2">
                <UserNav />
            </div>
            <div className="col">
                <h4>Wishlist</h4>
                {
                    wishlist.map((product) => {
                        return (
                            <div key={product._id} className="alert alert-secondary">
                                <Link to={`/product/${product.slug}`}>
                                    {product.title}
                                </Link>
                                <span
                                    onClick={() => handleRemoveFromWishlist(product._id)}
                                    className="btn btn-sm float-right"
                                >
                                    <DeleteOutlined className="text-danger" />
                                </span>
                            </div>
                        )
                    })
                }
            </div>
            </div>
        </div>
    )
}

export default Wishlist;
