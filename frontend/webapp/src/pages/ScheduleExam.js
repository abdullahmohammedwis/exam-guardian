import React, {useState} from 'react'
import '../assets/ScheduleExam.css';
import { Container, Card, Row, Col, Form, Button, InputGroup} from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import InstructionsCard from '../components/InstructionsCard';
import AlertsCard from '../components/AlertsCard';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import ENDPOINT_URL from '../utils/variables';
import Cookies from 'js-cookie';
const ScheduleExam = () => {

    const [examId, setExamId] = useState(null);
    const sidebarMenuItems = [
        { href: '/schedule-exam', name: 'SCHEDULE EXAM', icon: 'info-circle' },
        { href: '/manage-alert', name: 'ALERT TEMPLATES', icon: 'cog' },
        { href: '/manage-instruction', name: 'INSTRUCTION TEMPLATES', icon: 'cog' },
      ];

      const [error, setError] = useState('');
      const [instructions, setInstructions] = useState(null);
      const [addedAlertsData, setAddedAlerts] = useState([]);
      
      const handleAddedAlertsChange = (alerts) => {
        setAddedAlerts(alerts);
        
      };

      const [examData, setExamData] = useState({
        moduleName: '',
        examDate: '',
        startTime: '',
        finishTime: '',
        totalStudents: 1,
      });
      
      const handleDateChange = (event) => {
        const { value } = event.target;
        setExamData((prevState) => ({
          ...prevState,
          examDate: value,
          startTime: '', // Reset startTime when date changes to prevent selecting past time
          finishTime: '', // Reset finishTime when date changes to ensure start time is less than finish time
        }));
      };

      const handleChange = (event) => {
        const { id, value } = event.target;
        setExamData((prevState) => ({
          ...prevState,
          [id]: value,
        }));
      };
      
      const handleSubmit = () => {
        
        if (!examData.moduleName || !examData.examDate || !examData.startTime || !examData.finishTime || !instructions) {
            setError('Please fill in all required fields.');
            return;
          }

          if(examData.totalStudents <= 0)
          {
            setError('Please make sure total students are greater than 0.');
            return;
          }

          if (new Date(`2000-01-01T${examData.startTime}`) >= new Date(`2000-01-01T${examData.finishTime}`)) {
            setError('Please make sure Finish Time should be greater than Start Time.');
            return;
          }

          const examStartTime = new Date(`2000-01-01T${examData.startTime}`);
          const examFinishTime = new Date(`2000-01-01T${examData.finishTime}`);

          // Check if any alert's start and finish time is outside the exam time range
          for (const alert of addedAlertsData) {
            const alertStartTime = new Date(`2000-01-01T${alert.startTime}`);
            const alertFinishTime = new Date(`2000-01-01T${alert.finishTime}`);
            
            if (alertStartTime < examStartTime || alertFinishTime > examFinishTime) {
              setError('Alert time should be within the exam time range.');
              return;
            }
          }
      
          const dataToSend = {
            moduleName: examData.moduleName,
            examDate: new Date(examData.examDate), // Convert to Date object for the server to handle it as a date
            startTime: examData.startTime,
            finishTime: examData.finishTime,
            totalStudents: examData.totalStudents,
            examAlerts: addedAlertsData.map((alert) => ({
              alert: alert.alertId,
              startTime: alert.startTime,
              finishTime: alert.finishTime,
            })),
            examInstructions: instructions,
            examIssues: [''],
          };
        // Send the examData using Axios to the API
        axios
        .post(`${ENDPOINT_URL}/exam/schedule-exam`, dataToSend, {
          headers: {
            'Authorization': Cookies.get('jwt')
          }
        })
        .then((response) => {
          setExamId(response.data._id);
          toast.success('Exam Scheduled Successfully!');
          console.log('Exam data saved successfully:', response.data);
        })
        .catch((error) => {
          // Handle errors here if needed
          let message = 'An error occurred while scheduling exam, please try again!';
          setError(message);
          toast.error('Exam Failed to Get Scheduled');
          console.error('Error occurred in scheduling exam:', error);
        });
      };

      const handleCopyExamUrl = () => {
        const examUrl = `http://localhost:3000/exam/${examId}`;
        navigator.clipboard.writeText(examUrl)
          .then(() => {
            toast.success('URL Copied to Clipboard');
          })
          .catch((error) => {
            console.error('Error copying URL to clipboard:', error);
            toast.error('Failed to copy URL to clipboard');
          });
      };

  return (
    <>
        <Container fluid className="d-flex p-0">
        <Sidebar heading="SCHEDULE EXAM" menuItems={sidebarMenuItems} selectedIndex={0} />
            <Container fluid className='home-body'>
                <Container className='heading-home'>
                    <h1>Schedule a New Exam</h1>
                    <p>Schedule Your Next Exam with Ease!</p>
                    <hr></hr>
                    {error && <Container className="mb-3 text-danger alert alert-danger alert-container">{error}</Container>}
                    {examId && 
                    <Form.Group controlId="examId">
                    <Form.Label>Public Access URL</Form.Label>
                    <InputGroup style={{width:'500px'}}>
                      <Form.Control type="text"  value={`http://localhost:3000/examview/${examId}`} disabled />
                      <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => handleCopyExamUrl()}>
                        <FontAwesomeIcon icon={faCopy} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>}
                </Container>
                
                <Container className='schedule-container'>
                    <Container >
                        <Row className="mb-0 label">
                            <Col>
                                <h6>Exam Schedule<span className="text-danger">*</span></h6>
                            </Col>
                        </Row>
                        <Card border="gray" className="text-center p-3 position-relative schedule-card">
                            
                        <Card.Body>
                            <Form>
                            <Form.Group controlId="moduleName">
                                <Form.Label className="mt-1 d-flex align-items-start">
                                Module Name<span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="Enter Module Name"
                                value={examData.moduleName}
                                onChange={handleChange}
                                required
                                />
                            </Form.Group>
                            <Form.Group controlId="examDate">
                                <Form.Label className="mt-3 d-flex align-items-start">
                                Exam Date<span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                type="date"
                                value={examData.examDate}
                                onChange={handleDateChange}
                                min={new Date().toISOString().split('T')[0]} // Set min attribute to prevent past dates
                                required
                                />
                            </Form.Group>
                            <Row className="mt-3">
                                <Col>
                                <Form.Group controlId="startTime">
                                    <Form.Label className="d-flex align-items-start justify-content-start">
                                    Start Time<span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                    type="time"
                                    value={examData.startTime}
                                    onChange={handleChange}
                                    required
                                    min={examData.examDate === new Date().toISOString().split('T')[0] ? new Date().toLocaleTimeString() : ''}
                                    />
                                </Form.Group>
                                </Col>
                                <Col className="mt-3 d-flex align-items-center justify-content-around p-0">
                                <span className="text-muted">_</span>
                                </Col>
                                <Col>
                                <Form.Group controlId="finishTime">
                                    <Form.Label className="d-flex align-items-start justify-content-start">
                                    Finish Time<span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                    type="time"
                                    value={examData.finishTime}
                                    onChange={handleChange}
                                    required
                                    min={examData.startTime || examData.examDate === new Date().toISOString().split('T')[0] ? examData.startTime : ''}
                                    />
                                </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="totalStudents">
                                <Form.Label className="mt-3 d-flex align-items-start">
                                Total Students<span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                type="number"
                                value={examData.totalStudents}
                                onChange={handleChange}
                                required
                                />
                            </Form.Group>
                            </Form>
                        </Card.Body>
                        </Card>
                        
                    </Container>
                    <Row className='d-flex align-items-start'>
                        <InstructionsCard setInstructions={setInstructions} />
                        <AlertsCard addedAlertsData={addedAlertsData} onAlertsChange={handleAddedAlertsChange} />
                    </Row>
                </Container>
                <Row className="mt-2 mb-2 d-flex align-items-center justify-content-center sc-button-primary">
                    <Button variant="success" onClick={handleSubmit}><strong>Schedule Exam!</strong></Button>
                </Row>
            </Container>
            <Toaster/>
        </Container>
    </>
  )
}

export default ScheduleExam