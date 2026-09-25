import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../../main.scss'

const Sidebar = () => {
    const navigate = useNavigate()
    const doLogout = () => {
        localStorage.clear()
        navigate('/')
        window.location.reload()
    }
    return (
        <div className="adminSidebar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
        style={{
            width: "260px",
            height: "calc(100vh - 48px)",
            position: "sticky",
            top: "48px"
        }}>
            <span className="fs-4">Admin Panel</span>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink to="/admin-dashboard" end className={({ isActive }) => "nav-link text-white " + (isActive ? "active" : "")}>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin-dashboard/properties" className={({ isActive }) => "nav-link text-white " + (isActive ? "active" : "")}>
                        View All Properties
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin-dashboard/add-property" className={({ isActive }) => "nav-link text-white " + (isActive ? "active" : "")}>
                        Add Property
                    </NavLink>
                </li>
                <li onClick={doLogout}>
                    <span className="nav-link text-white pointer" style={{ cursor: "pointer" }}>
                        Logout
                    </span>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
