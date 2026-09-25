import Sidebar from "../Components/AdminComponents/Sidebar/Sidebar"
import { Outlet } from 'react-router-dom'
const AdminDashboard = () => {

    return (
        <>
            <div className='d-flex admin-layout'>
                <Sidebar />
                <div className='admin-content flex-grow-1'>
                    <div className="container-fluid">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard
