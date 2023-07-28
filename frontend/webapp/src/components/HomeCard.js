import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/Home.css';

const HomeCard = ({ imageSrc, title, description, buttonText, linkTo }) => {
  return (
    <Card className='home-card'>
      <Card.Img className='home-card-img' src={imageSrc} alt={title} />
      <Card.Body className='home-card-body'>
        <Card.Title>
          <h3>{title}</h3>
        </Card.Title>
        <Card.Text>
          <p>{description}</p>
        </Card.Text>
        <Button className='button-primary' as={Link} to={linkTo}>
          <FontAwesomeIcon icon={buttonText.icon} /> <span>{buttonText.text}</span>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default HomeCard;
