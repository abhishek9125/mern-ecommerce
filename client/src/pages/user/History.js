import React from 'react';
import UserNav from '../../components/Navbar/UserNav';

function History() {
    return (
        <div className="container-fluid">
            <div className="row">

            <div className="col-md-2">
                <UserNav />
            </div>
            <div className="col">
                User History
            </div>
            </div>
        </div>
    )
}

export default History;
