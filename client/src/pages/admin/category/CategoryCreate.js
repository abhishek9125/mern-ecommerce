import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/Navbar/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createCategory, getCategories, removeCategory } from '../../../functions/category';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/Forms/CategoryForm';

function CategoryCreate() {

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(async () => {
        const response = await getCategories();
        setCategories(response.data);
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCategory({ name }, user.token)
        .then(async (response) => {
            setLoading(false);
            setName('');
            toast.success(`${response.data.name} Category Created Successfully..!!`);
            const cateforyResponse = await getCategories();
            setCategories(cateforyResponse.data);
        })
        .catch((error) => {
            setLoading(false);
            if(error.response.status === 400) toast.error(error.response.data)
            console.log('Error Adding Category : ', error);
        });
    }

    const handleRemoveCategory = async (slug) => {
        if(window.confirm('Delete this Category?')) {
            setLoading(true);
            removeCategory(slug, user.token)
            .then(async (response) => {
                setLoading(false);
                toast.error(`${response.data.name} Category Deleted Successfully..!!`);
                const cateforyResponse = await getCategories();
                setCategories(cateforyResponse.data);
            })
            .catch((error) => {
                setLoading(false);
                if(error.response.status === 400) toast.error(error.response.data)
                console.log('Error Deleting Category : ', error);
            })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <h4>Create Category</h4>
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} loading={loading} />
                    {
                        categories.map((category) => {
                            return (
                                <div key={category._id} className="alert alert-secondary">
                                    {category.name}
                                    <span className="btn btn-small float-right" onClick={() => handleRemoveCategory(category.slug)}>
                                        <DeleteOutlined className="text-danger" />
                                    </span> 
                                    <span className="btn btn-small float-right">
                                        <Link to={`/admin/category/${category.slug}`}>
                                            <EditOutlined className="text-warning" />
                                        </Link>
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

export default CategoryCreate;