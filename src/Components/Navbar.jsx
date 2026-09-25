import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation, useNavigate } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const MainNavbar = ({ isAdmin }) => {
  const user = JSON.parse(localStorage.getItem('user') || "null");
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [scrolled, setScrolled] = useState(false);

  const changeNavbarColor = () => {
    setScrolled(window.scrollY >= 100);
  }

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarColor);

    return () => window.removeEventListener("scroll", changeNavbarColor);
  }, []);
  

  const isAdminPage = pathname.startsWith('/admin-dashboard')

  const doLogout = () => {
    localStorage.clear();
    navigate('/');
  }

  if (isAdminPage) return null;

  return (
    <>
    <header className='w-100'>    
      <Navbar expand="lg" className={`navbar ${scrolled ? 'navbar-scrolled shadow-lg' : 'navbar-transparent'} text-light w-100`}>
        <Container className='nav d-flex justify-content-between'>
          <a href="#home" className='brand' >ABC Properties</a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end md:d-flex' style={{gap:"50px"}}>
            <Nav style={{ gap: '30px' }}>
              <Nav.Link href="/home">Home</Nav.Link>              
              <Nav.Link href="#link">Projects</Nav.Link>              
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
            {user && (
              
            <NavDropdown id="basic-nav-dropdown"  className='usernav'
            title = {
              <div className='rounded-circle bg-white d-flex justify-content-center align-items-center mt-3' style={{height:"30px", width:"30px"}}>
                <FontAwesomeIcon icon={faUser} size='20' color="var(--primary-color)"  />
              </div>
            }>
              <NavDropdown.Item className='user-name-display'>Logged in as {user.name}</NavDropdown.Item>
              <NavDropdown.Item href="/">Profile</NavDropdown.Item>
              <Nav.Link href="/my-bookings">My Bookings</Nav.Link>
              <NavDropdown.Item link onClick={doLogout}>Sign out</NavDropdown.Item>
            </NavDropdown>
            ) }
            {!user && (
            <a className='btn btn-primary' href="/login">Login</a>
            ) }
            

          </Navbar.Collapse>
          
        </Container>
        
      </Navbar>
    </header>
    </>
  )

}

export default MainNavbar