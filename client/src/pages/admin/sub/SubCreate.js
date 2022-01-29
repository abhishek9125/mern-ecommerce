import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/Navbar/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';
import { createSub, getSubs, removeSub } from '../../../functions/sub';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/Forms/CategoryForm';
import LocalSearch from '../../../components/Forms/LocalSearch';

function SubCreate() {

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([]);
    const [category, setCategory] = useState('');
    const [keyword, setKeyword] = useState('');

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(async () => {
        const categoryResponse = await getCategories();
        setCategories(categoryResponse.data);

        const subResponse = await getSubs();
        setSubs(subResponse.data);
    },[])

    console.log(`subs`, subs)
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createSub({ name, parent: category }, user.token)
        .then(async (response) => {
            setLoading(false);
            setName('');
            toast.success(`${response.data.name} Sub Category Created Successfully..!!`);
            const subResponse = await getSubs();
            setSubs(subResponse.data);
        })
        .catch((error) => {
            setLoading(false);
            if(error.response.status === 400) toast.error(error.response.data)
            console.log('Error Adding Category : ', error);
        });
    }

    const handleRemoveSub = async (slug) => {
        if(window.confirm('Delete this Category?')) {
            setLoading(true);
            removeSub(slug, user.token)
            .then(async (response) => {
                setLoading(false);
                toast.error(`${response.data.name} Category Sub Deleted Successfully..!!`);
                const subResponse = await getSubs();
                setSubs(subResponse.data);
            })
            .catch((error) => {
                setLoading(false);
                if(error.response.status === 400) toast.error(error.response.data)
                console.log('Error Deleting Category : ', error);
            })
        }
    }

    const searched = (keyword) => (item) => item.name.toLowerCase().includes(keyword);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <h4>Create Sub Category</h4>

                    <div className="form-group">
                        <label>Parent Category</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>Please select a Category</option>
                            {
                                categories.length > 0 &&
                                categories.map((c) => {
                                    return (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    )
                                })
                            }

                        </select>
                    </div>

                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} loading={loading} />
                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                    {
                        subs.filter(searched(keyword)).map((sub) => {
                            return (
                                <div key={sub._id} className="alert alert-secondary">
                                    {sub.name}
                                    <span className="btn btn-small float-right" onClick={() => handleRemoveSub(sub.slug)}>
                                        <DeleteOutlined className="text-danger" />
                                    </span> 
                                    <span className="btn btn-small float-right">
                                        <Link to={`/admin/sub/${sub.slug}`}>
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

export default SubCreate;
