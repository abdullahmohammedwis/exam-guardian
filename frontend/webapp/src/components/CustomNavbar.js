import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/lsbu_logo_white.png'
import '../assets/Navbar.css'

const CustomNavbar = () => {
  const isLoggedIn = !!Cookies.get('jwtToken');
  
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
              <Nav.Link as={Link} to="/login">
                <Link to="/"><FontAwesomeIcon icon={faHome} /><a>Home</a></Link>
              </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
              <Nav.Link as={Link} to="/login">
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
