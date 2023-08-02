import React from 'react';
import { Container} from 'react-bootstrap';
import { faCalendarPlus, faClipboardList, faUserCog } from '@fortawesome/free-solid-svg-icons'; // Import the required icons
import '../assets/Home.css';
import scheduleExamImage from '../images/schedule_exam.png';
import examLogsImage from '../images/exam_logs.jpg';
import examOngoingImage from '../images/exam_ongoing.jpg';
import manageUsersImage from '../images/manage_users.png';
import { useAuth } from '../utils/AuthContext'
import HomeCard from '../components/HomeCard';

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
          <h1>Welcome Dear, {userData.fullName || ''}</h1>
          <p>Hope You Are Doing Great!</p>
        </Container>
        <Container className='home-container'>
        <div>
            <HomeCard
            imageSrc={scheduleExamImage} title="Schedule an Exam" description="Upcoming Exams to be Scheduled"
            buttonText={{ icon: faCalendarPlus, text: 'Schedule Now' }}
            linkTo="/schedule-exam"/>
        </div>
        <div>
            <HomeCard imageSrc={examLogsImage} title="Exam Logs" description="View Logs of Exams Conducted" 
            buttonText={{ icon: faClipboardList, text: 'View Exam Logs' }}
            linkTo="/exam-logs"/>
        </div>
        <div>
        <HomeCard imageSrc={examOngoingImage} title="Ongoing Exams" description="View Exams Currently in Progress" 
            buttonText={{ icon: faClipboardList, text: 'View Ongoing Exams' }}
            linkTo="/ongoing-exams"/>
        </div>
        <div>
        {userData.isAdmin ? (
          <>
          <HomeCard imageSrc={manageUsersImage} title="Manage Users" description="Manage Users of ExamGuardian" 
            buttonText={{ icon: faUserCog, text: 'Manage Users' }}
            linkTo="/manage-users"/>
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
