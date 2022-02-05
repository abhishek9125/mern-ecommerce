import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/Navbar/AdminNav';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { createCoupon, getCoupons, removeCoupon } from '../../../functions/coupon';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from '@ant-design/icons';

function CreateCouponPage() {

    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [discount, setDiscount] = useState('');
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        getCoupons().then((response) => setCoupons(response.data));
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCoupon({name, discount, expiry}, user.token)
        .then((response) => {
            setLoading(false);
            setName('');
            setDiscount('');
            setExpiry('');
            getCoupons().then((res) => setCoupons(res.data));
            toast.success(`${response.data.name} is Created Successfully`);
        })
        .catch((error) => {
            console.log('Error Creating Coupon: ', error);
        })
    }

    const handleRemove = (couponId) => {
        if(window.confirm('Delete Coupon ?')) {
            setLoading(true);
            removeCoupon(couponId, user.token)
            .then((response) => {
                getCoupons().then((res) => setCoupons(res.data));
                setLoading(false);
                toast.error(`Coupon ${response.data.name} Deleted Successfully`);
            })
            .catch((error) => {
                console.log('Error Deleting Coupon : ', error);
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
                    <h4>Coupons</h4>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label className="text-muted">Name</label>
                            <input 
                                required
                                autoFocus
                                type="text"
                                value={name}
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Discount %</label>
                            <input 
                                required
                                type="text"
                                value={discount}
                                className="form-control"
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Expiry</label>
                            <DatePicker 
                                required
                                value={expiry}
                                selected={new Date()}
                                className="form-control"
                                onChange={(date) => setExpiry(date)}
                            />
                        </div>

                        <button className="btn btn-primary btn-raised">
                            Save
                        </button>

                    </form>
                    <br />
                    <h4>{coupons.length} Coupons</h4>
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Expiry</th>
                                <th scope="col">Discount</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                coupons.map((c) => (
                                    <tr key={c._id}>
                                        <td>{c.name}</td>
                                        <td>{new Date(c.expiry).toLocaleDateString()}</td>
                                        <td>{c.discount}</td>
                                        <td>
                                            <DeleteOutlined 
                                                onClick={() => handleRemove(c._id)}
                                                className="text-danger pointer"
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CreateCouponPage;
