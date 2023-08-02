import React, {useState} from 'react';
import { Container, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInfoCircle, faCog } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../assets/Sidebar.css'
library.add(faInfoCircle, faCog);
const Sidebar = ({ menuItems, heading, selectedIndex }) => {
    const navigate = useNavigate();

  return (
    <Col md={2}>
      <Container className="pt-2 sidebar-container">
        <h5>{heading}</h5>
        <hr />
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={index === selectedIndex ? 'selected' : ''}
              onClick={() => navigate(item.href)}
            >
              <a>
                <FontAwesomeIcon icon={item.icon} className="icon-gap" /> {item.name}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Col>
  );
};

export default Sidebar;
