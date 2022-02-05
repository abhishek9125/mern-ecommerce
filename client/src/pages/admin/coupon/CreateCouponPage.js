import React from 'react';
import AdminNav from '../../../components/Navbar/AdminNav';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { createCoupon, getCoupons, removeCoupon } from '../../../functions/coupon';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from '@ant-design/icons';

function CreateCouponPage() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Coupons</h4>
                </div>
            </div>
        </div>
    )
}

export default CreateCouponPage;
