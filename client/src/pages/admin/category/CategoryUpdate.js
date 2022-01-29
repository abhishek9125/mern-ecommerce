import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/Navbar/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../functions/category';
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from '../../../components/Forms/CategoryForm';

function CategoryUpdate() {

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    const { slug } = useParams();
    useEffect(async () => {
        const categoryResponse = await getCategory(slug);
        setName(categoryResponse.data.name);
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateCategory(slug, { name }, user.token)
        .then(async (response) => {
            if(!response.data) { 
                toast.error('Something Went Wrong');
                navigate('/admin/category');
            }
            setLoading(false);
            setName('');
            toast.success(`${response.data.name} Category Updated Successfully..!!`);
            navigate('/admin/category');
        })
        .catch((error) => {
            setLoading(false);
            if(error.response.status === 400) toast.error(error.response.data)
            console.log('Error Adding Category : ', error);
        });
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <h4>Update Category</h4>
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} loading={loading} />
                </div>
            </div>
        </div>
    )
}

export default CategoryUpdate;
