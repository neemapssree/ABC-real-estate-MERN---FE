import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AdminCustomMenu from "./AdminCustomMenu";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const AdminTopPanel = () => {

    const [menu, setMenu] = useState(null);
    const navigate = useNavigate();  
    
    const currentURl = window.location.href;
    const isDashboard = currentURl.includes('admin-dashboard');

    // const openAdminMenu = (event) => {
    //     // document.getElementById('sidebar').classList.toggle('active');
    //     event.preventDefault();
    //     setMenu({
    //         top: event.clientY,
    //         left: event.clientX,
    //     });        
    // }


    return(
        <>
        <div className='bg-dark py-2 admin-topbar w-100'>
            <div
                className='d-flex justify-content-start gap-3 align-items-center text-light'
                style={{ cursor: "pointer" }} >
                    {isDashboard ? (
                        <Button onClick={()=> navigate('/home')} className="text-sm bg-transparent p-0 border-0 d-flex align-items-center justify-between gap-2" >
                            <FontAwesomeIcon icon={faDashboard} size='xl' className='ms-2' color='#fff' />
                            View Website
                        </Button>
                    ) : (
                        <a href="/admin-dashboard" className="text-sm text-light text-decoration-none bg-transparent p-0 border-0 d-flex align-items-center justify-between gap-2">
                            <FontAwesomeIcon icon={faDashboard} size='xl' className='ms-2' color='#fff' />
                            Admin Dashboard
                        </a>
                    )
                    }
                
                
            </div>
            {menu && ( 
                <AdminCustomMenu
                top={menu.top}
                left={menu.left}
                onClose={() => setMenu(null)} />
            )}
        </div >
        </>
    )
}

export default AdminTopPanel