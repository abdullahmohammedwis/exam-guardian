import React from 'react'
import '../assets/ScheduleExam.css';
import { Container, Card} from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
const AlertTemplate = () => {

    const sidebarMenuItems = [
        { href: '/schedule-exam', name: 'SCHEDULE EXAM', icon: 'info-circle' },
        { href: '/manage-alert', name: 'ALERT TEMPLATES', icon: 'cog' },
        { href: '/manage-instruction', name: 'INSTRUCTION TEMPLATES', icon: 'cog' },
      ];

  return (
    <>
        <Container fluid className="d-flex p-0">
        <Sidebar heading="ALERT TEMPLATES" menuItems={sidebarMenuItems} selectedIndex={1} />
            <Container fluid className='home-body'>
                <Container className='heading-home'>
                <h1>Manage Your Alert Templates</h1>
                <p>Preconfigure Alerts to Add in the Exams</p>
                </Container>
                <Container className='schedule-container'>

                </Container>
            </Container>
        </Container>
    </>
  )
}

export default AlertTemplate