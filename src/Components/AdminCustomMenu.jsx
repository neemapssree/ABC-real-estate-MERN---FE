import { useLocation } from "react-router-dom";

const AdminCustomMenu = ({ top, left }) => {
    const location = useLocation();
    const pathname = location.pathname;

    const isAdminDashboard = ['/admin-dashboard'].some((path) =>
        pathname.includes(path));

    const menuStyle = {
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 1000,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '10px',
        cursor: 'pointer',
    }
    return (
        <div style={menuStyle} id="admin-menu">
            {isAdminDashboard
                ? <a href="/home" style={{ textDecoration : "none"}}>Visit website</a>
                : <a href="/admin-dashboard" style={{ textDecoration : "none"}}>Admin Dashboard</a>
            }
        </div>
    )
}

export default AdminCustomMenu