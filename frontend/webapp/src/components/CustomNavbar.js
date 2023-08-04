import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome, faUser} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/lsbu_logo_white.png'
import '../assets/Navbar.css'
import { useAuth } from '../utils/AuthContext'

const CustomNavbar = () => {
  const { isLoggedIn, handleLogout } = useAuth();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  // Update the active link whenever the location changes
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <Navbar className="navbar-container">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse>
        {isLoggedIn && (
          <>
          <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/"
                className={activeLink === '/' ? 'active' : ''}
              >
                <FontAwesomeIcon icon={faHome} /><a>Home</a>
              </Nav.Link>
              
          </Nav>
          <Nav className="ms-auto">
              <Nav.Link as={Link} to="/login" onClick={handleLogout}>
                  
                 <Button type="button" variant="danger"><FontAwesomeIcon icon={faSignOutAlt} />&nbsp;Logout</Button>
              </Nav.Link>
          </Nav>
          </>
        )}
        </Navbar.Collapse>
      </Container>  
    </Navbar>
  );
};

export default CustomNavbar;
