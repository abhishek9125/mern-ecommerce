import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/Navbar/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ProductCreateForm from '../../../components/Forms/ProductCreateForm';
import { getProduct } from '../../../functions/product';
import FileUpload from '../../../components/Forms/FileUpload';
import { useNavigate, useParams } from "react-router-dom";
import ProductUpdateForm from '../../../components/Forms/ProductUpdateForm';
import { getCategories, getCategorySubs } from '../../../functions/category';


const initialState = {
    title: "",
    description: "",
    price: "",
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
    const [subOptions, setSubOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategoryIds, setSubCategoryIds] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));
    const { slug } = useParams();

    useEffect(() => {
        loadProduct(); 
        loadCategories();
    }, [])

    const loadProduct = () => {
        getProduct(slug)
        .then((response) => {
            setValues({ ...values, ...response.data });
            getCategorySubs(response.data.category._id)
            .then((subResponse) => {
                setSubOptions(subResponse.data);
            })
            let subCategoryIdArray = [];
            response.data.subs.map((s) => {
                subCategoryIdArray.push(s._id);
            })
            setSubCategoryIds(subCategoryIdArray);
        })
        .catch((error) => {
            console.log('Error Fetching Product : ', error);
        })
    }

    const loadCategories = () => {
        getCategories()
        .then((response) => {
            setCategories(response.data);
        })
        .catch((error) => {
            console.log('Error Fetching Category List : ', error);
        })
    }

    const handleSubmit = (e) => {
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleCategoryChange = (e) => {
        e.preventDefault();
        setValues({ ...values, subs: [] });
        setSelectedCategory(e.target.value);
        getCategorySubs(e.target.value)
        .then((response) => {
            setSubOptions(response.data)
        })
        .catch((error) => {
            console.log('Error Fetching Sub Category List : ', error);
            toast.error('Error Fetching Sub Category List');
        });
        if(values.category._id === e.target.value) {
            loadProduct();
        } else {
            setSubCategoryIds([]);
        }
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
                    <div className="p-3">
                        <FileUpload loading={loading} setLoading={setLoading} setValues={setValues} values={values} />
                    </div>
                    <ProductUpdateForm 
                        values={values} 
                        setValues={setValues}
                        categories={categories}
                        subOptions={subOptions}
                        handleSubmit={handleSubmit} 
                        handleChange={handleChange} 
                        subCategoryIds={subCategoryIds}
                        setSubCategoryIds={setSubCategoryIds}
                        selectedCategory={selectedCategory}
                        handleCategoryChange={handleCategoryChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate;
