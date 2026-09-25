import Footer from "./Components/Footer"
import MainNavbar from "./Components/Navbar"
import AdminTopPanel from "./Components/AdminTopPanel"
import { useAuth } from "./Context/AuthContext"
import { useLocation} from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useEffectEvent } from "react"

const Layout = ({ children }) => {
    // const user = JSON.parse(localStorage.getItem('user') || "null");
    const { user } = useAuth();
    //console.log("ADMIN", user?.role);
    const isAdmin = user?.role === 1;

    const location = useLocation();
    const pathname = location.pathname;    

    const noNavBarPages = pathname.includes('/login');

    const [adminHeight, setAdminHeight] = useState(0);
    const adminRef = useRef(null);

    useEffect(() => {
        if(adminRef.current) {
            setAdminHeight(adminRef.current.offsetHeight);
        }
    },[isAdmin]);
    
    return (
        <>
           
            <div className="position-fixed w-100 top-0 left-0 start-0 z-3">
                 {isAdmin && <AdminTopPanel ref={adminRef} />}
                 {!noNavBarPages && <MainNavbar isAdmin={isAdmin} />}           
            </div>
            
            {children}

            {!noNavBarPages && (
                <Footer />
            )}         
            
        </>
    )
}

export default Layout