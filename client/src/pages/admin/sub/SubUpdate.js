import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/Navbar/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';
import { updateSub, getSub } from '../../../functions/sub';
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from '../../../components/Forms/CategoryForm';

function SubUpdate() {

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState('');

    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    const { slug } = useParams();

    useEffect(async () => {
        const categoryResponse = await getCategories();
        setCategories(categoryResponse.data);

        const subResponse = await getSub(slug);
        setName(subResponse.data.name);
        setParent(subResponse.data.parent);
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateSub(slug, { name, parent }, user.token)
        .then(async (response) => {
            setLoading(false);
            setName('');
            toast.success(`${response.data.name} Sub Category Updated Successfully..!!`);
            navigate('/admin/sub');
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
                    <h4>Update Sub Category</h4>

                    <div className="form-group">
                        <label>Parent Category</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={(e) => setParent(e.target.value)}
                        >
                            <option>Please select a Parent Category</option>
                            {
                                categories.length > 0 &&
                                categories.map((c) => {
                                    return (
                                        <option key={c._id} value={c._id} selected={c._id === parent}>
                                            {c.name}
                                        </option>
                                    )
                                })
                            }

                        </select>
                    </div>

                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} loading={loading} />
                </div>
            </div>
        </div>
    )
}

export default SubUpdate;
