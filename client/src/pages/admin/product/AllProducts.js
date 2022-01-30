import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AdminProductCard from '../../../components/Cards/AdminProductCard';
import AdminNav from '../../../components/Navbar/AdminNav';
import { getProductsByCount } from '../../../functions/product';
import { LoadingOutlined } from '@ant-design/icons'
import { removeProduct } from '../../../functions/product';

function AllProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

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

    const handleRemoveProduct = (slug) => {
        if(window.confirm('Delete this Product?')) {
            setLoading(true);
            removeProduct(slug, user.token)
            .then((response) => {
                setLoading(false);
                loadAllProducts();
                toast.success(`${response.data.title} is Deleted Successfully.`)
            })
            .catch((error) => {
                setLoading(false);
                if(error.response.status === 400) toast.error(error.response.data)
                console.log('Error Deleting Product : ', error);
            })
        }
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
                                        <AdminProductCard 
                                            product={product} 
                                            handleRemoveProduct={handleRemoveProduct}
                                        />
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

export default AllProducts;
