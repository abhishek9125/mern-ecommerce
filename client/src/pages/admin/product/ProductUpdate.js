import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/Navbar/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
import ProductCreateForm from '../../../components/Forms/ProductCreateForm';
import { getProduct } from '../../../functions/product';
import FileUpload from '../../../components/Forms/FileUpload';
import { useNavigate, useParams } from "react-router-dom";
import ProductUpdateForm from '../../../components/Forms/ProductUpdateForm';

const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    brands: ['Apple', 'Sony', 'Lenovo', 'Microsoft', 'Sony', 'Samsung', 'Asus'],
    color: "",
    brand: ""
}

function ProductUpdate() {

    const [values, setValues] = useState(initialState);
    const { user } = useSelector((state) => ({ ...state }));
    const { slug } = useParams();

    useEffect(() => {
        loadProduct(); 
    }, [])

    const loadProduct = () => {
        getProduct(slug)
        .then((response) => {
            setValues({ ...values, ...response.data });
        })
        .catch((error) => {
            console.log('Error Fetching Product : ', error);
        })
    }

    const handleSubmit = (e) => {
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Update Product</h4>
                    <hr />
                    <ProductUpdateForm 
                        values={values} 
                        setValues={setValues}
                        handleSubmit={handleSubmit} 
                        handleChange={handleChange} 
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate;
