import React from 'react';
import AdminNav from '../../../components/Navbar/AdminNav';

function CategoryCreate() {
    return (
        <div className="container-fluid">
            <div className="row">

            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">
                Create Category
            </div>
            </div>
        </div>
    )
}

export default CategoryCreate;
