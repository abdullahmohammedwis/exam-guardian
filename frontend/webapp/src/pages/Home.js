import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faClipboardList, faUserCog } from '@fortawesome/free-solid-svg-icons'; // Import the required icons
import '../assets/Home.css';
import scheduleExamImage from '../images/schedule_exam.png';
import examLogsImage from '../images/exam_logs.jpg';
import examOngoingImage from '../images/exam_ongoing.jpg';
import manageUsersImage from '../images/manage_users.png';
import { useAuth } from '../utils/AuthContext'
import axios from 'axios';
import Cookies from 'js-cookie';
import ENDPOINT_URL from '../utils/variables';

const Home = () => {
  const { isLoggedIn } = useAuth();
  const userDataString = sessionStorage.getItem('userDetails');
  const userData = JSON.parse(userDataString);


  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <Container fluid className='home-body'>
        <Container className='heading-home'>
          <h1>Welcome Dear, {userData.fullName}</h1>
          <p>Hope You Are Doing Great!</p>
        </Container>
        <Container className='home-container'>
        <div>
          <Card className='home-card'>
            <Card.Img className='home-card-img' src={scheduleExamImage} alt="Schedule Exam" />
            <Card.Body className='home-card-body'>
              <Card.Title><h3>Schedule an Exam</h3></Card.Title>
              <Card.Text><p>Upcoming Exams to be Scheduled</p></Card.Text>
              <Button className='button-primary' as={Link} to="/schedule-exam">
                <FontAwesomeIcon icon={faCalendarPlus} /> <span>Schedule Now</span>
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card className='home-card'>
            <Card.Img className='home-card-img' src={examLogsImage} alt="Exam Logs" />
            <Card.Body className='home-card-body'>
              <Card.Title><h3>Exam Logs</h3></Card.Title>
              <Card.Text><p>View Logs of Exams Conducted</p></Card.Text>
              <Button className='button-primary' as={Link} to="/exam-logs">
                <FontAwesomeIcon icon={faClipboardList} /> <span>View Exam Logs</span>
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div>
        <Card className='home-card'>
            <Card.Img className='home-card-img' src={examOngoingImage} alt="Ongoing Exams" />
            <Card.Body className='home-card-body'>
              <Card.Title><h3>Ongoing Exams</h3></Card.Title>
              <Card.Text><p>View Exams Currently in Progress</p></Card.Text>
              <Button className='button-primary' as={Link} to="/ongoing-exams">
                <FontAwesomeIcon icon={faClipboardList} /> <span>View Ongoing Exams</span>
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div>
        {userData.isAdmin ? (
          <>
          <Card className='home-card'>
            <Card.Img className='home-card-img' src={manageUsersImage} alt="Manage Users" />
            <Card.Body className='home-card-body'>
              <Card.Title><h3>Manage Users</h3></Card.Title>
              <Card.Text><p>Manage Users of ExamGuardian</p></Card.Text>
              <Button className='button-primary' as={Link} to="/manage-users">
                <FontAwesomeIcon icon={faUserCog} /> <span>Manage Users</span>
              </Button>
            </Card.Body>
          </Card>
          </>
          ):(
            null
          )}
        </div>
        </Container>
      </Container>
    </>
  );
};

export default Home;
