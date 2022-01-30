import React, { useState, useEffect } from 'react';
import AdminProductCard from '../../components/Cards/AdminProductCard';
import AdminNav from '../../components/Navbar/AdminNav';
import { getProductsByCount } from '../../functions/product';
import { LoadingOutlined } from '@ant-design/icons'

function AdminDashboard() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    },[])

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(100)
        .then((response) => {
            setProducts(response.data);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            console.log('Error Fetching Product List: ', error);
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>All Products</h4>
                    <div className="row pl-5 pr-5">
                        {
                            loading ? 
                            <LoadingOutlined />
                            :
                            products.map((product) => {
                                return (
                                    <div className="col-md-4" key={product._id}>
                                        <AdminProductCard product={product} />
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

export default AdminDashboard;
