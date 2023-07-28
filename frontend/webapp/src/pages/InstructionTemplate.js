import React from 'react'
import '../assets/ScheduleExam.css';
import { Container, Card} from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
const InstructionTemplate = () => {

    const sidebarMenuItems = [
        { href: '/schedule-exam', name: 'SCHEDULE EXAM', icon: 'info-circle' },
        { href: '/manage-alert', name: 'ALERT TEMPLATES', icon: 'cog' },
        { href: '/manage-instruction', name: 'INSTRUCTION TEMPLATES', icon: 'cog' },
      ];

  return (
    <>
        <Container fluid className="d-flex p-0">
        <Sidebar heading="INSTRUCTION TEMPLATES" menuItems={sidebarMenuItems} selectedIndex={2} />
            <Container fluid className='home-body'>
                <Container className='heading-home'>
                <h1>Manage Your Instructions Templates</h1>
                <p>Preconfigure Exam Instructions to Add in the Exams</p>
                </Container>
                <Container className='schedule-container'>
                    
                </Container>
            </Container>
        </Container>
    </>
  )
}

export default InstructionTemplate