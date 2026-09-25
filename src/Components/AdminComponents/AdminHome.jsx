import React from 'react';

const AdminHome = () => {
    return (
        <div className="container-fluid p-4">
            <h3>Admin Dashboard</h3>
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-header">Total Properties</div>
                        <div className="card-body">
                            <h5 className="card-title">150</h5>
                            <p className="card-text">Properties listed on the platform.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-header">Active Bookings</div>
                        <div className="card-body">
                            <h5 className="card-title">45</h5>
                            <p className="card-text">Current active bookings.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-warning mb-3">
                        <div className="card-header">New Users</div>
                        <div className="card-body">
                            <h5 className="card-title">12</h5>
                            <p className="card-text">Users registered this week.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
