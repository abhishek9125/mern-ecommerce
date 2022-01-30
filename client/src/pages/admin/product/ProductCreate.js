import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/Navbar/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createCategory, getCategories, removeCategory } from '../../../functions/category';
import { createProduct } from '../../../functions/product';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/Forms/CategoryForm';
import LocalSearch from '../../../components/Forms/LocalSearch';

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
    const { title, description, price, categories, category, subs, shipping, quantity, images, colors, brands, color, brand } = values;
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
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Title</label>
                            <input 
                                type="text"
                                name="title"
                                className="form-control"
                                value={title}
                                onChange={handleChange}
                                autoFocus
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <input 
                                type="text"
                                name="description"
                                className="form-control"
                                value={description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Price</label>
                            <input 
                                type="number"
                                name="price"
                                className="form-control"
                                value={price}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Shipping</label>
                            <select 
                                name="shipping"
                                className="form-control"
                                onChange={handleChange}
                            >   
                                <option value="">Please Select</option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Quantity</label>
                            <input 
                                type="number"
                                name="quantity"
                                className="form-control"
                                value={quantity}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Color</label>
                            <select 
                                name="color"
                                className="form-control"
                                onChange={handleChange}
                            >   
                                <option key="" value="">Please Select</option>
                                {
                                    colors.map((c) => {
                                        return (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Brand</label>
                            <select 
                                name="brand"
                                className="form-control"
                                onChange={handleChange}
                            >   
                                <option key="" value="">Please Select</option>
                                {
                                    brands.map((b) => {
                                        return (
                                            <option key={b} value={b}>
                                                {b}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <button className="btn btn-outline-info">
                            Save Product
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductCreate;
