import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/Navbar/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
import ProductCreateForm from '../../../components/Forms/ProductCreateForm';

const initialState = {
    title: "MacBook Pro Air",
    description: "Apple has the best collection.",
    price: "150000",
    categories: [],
    category: "",
    subs: [],
    shipping: "Yes",
    quantity: "200",
    images: [],
    colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    brands: ['Apple', 'Sony', 'Lenovo', 'Microsoft', 'Sony', 'Samsung', 'Asus'],
    color: "Silver",
    brand: "Apple"
}

function ProductCreate() {

    const [values, setValues] = useState(initialState);
    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
        .then((response) => {
            toast.success(`${response.data.title} is Created Successfully`);
            setValues(initialState);
        })
        .catch((error) => {
            console.log('Error Creating a New Product : ', error);
            toast.error(error.response.data.error);
        })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name] : e.target.value });
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Create Product</h4>
                    <hr />
                    <ProductCreateForm handleChange={handleChange} handleSubmit={handleSubmit} values={values} />
                </div>
            </div>
        </div>
    )
}

export default ProductCreate;
