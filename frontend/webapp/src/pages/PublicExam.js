import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';
import { Table, Container, Row, Col, Card } from 'react-bootstrap';
import ENDPOINT_URL from '../utils/variables';
import '../assets/Examview.css';
import Stopwatch from '../components/Stopwatch';
import '../assets/Stopwatch.css';

const override = css`
display: block;
margin: 0 auto;
border-color: red;
`;

const PublicExam = () => {
const { examId } = useParams();
const [examDetails, setExamDetails] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const [examStatusText, setexamStatusText] = useState('');
const [examStatus, setexamStatus] = useState(false);
const [examAlerts, setExamAlerts] = useState(null);
const [visibleExamAlerts, setVisibleExamAlerts] = useState(null);

const [intervalID, setIntervalID] = useState(null);
const getLondonTime = () => {
    const londonTime = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });
    const [, timePart] = londonTime.split(', ');
  
    return timePart;
  };

  const isAlertActive = (alert) => {
    const londonTime = getLondonTime();
    console.log('londonTime: ' + londonTime + 'alert.startTime: ' + alert.startTime +'--'+'alert.finishTime: ' + alert.finishTime)
    return londonTime >= alert.startTime && londonTime <= alert.finishTime;
    
  };

const isExamStarted = () => {
    // Get the current time in London time zone
    const currentLondonTime = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });
    
    // Extract the date part from examDetails.examDate
    const examDateOnly = new Date(examDetails.examDate).toISOString('en-GB').split('T')[0];
    
    // Split the date into its components (year, month, day) and reverse the order
    const [year, month, day] = examDateOnly.split("-");

    // Create the new formatted date string in "DD/MM/YYYY" format
    const formattedDate = `${day}/${month}/${year}`;

    // Assuming examDetails.startTime is a valid time in 24-hour format, e.g., "13:30"
    const examStartTime = `${formattedDate}, ${examDetails.startTime}:00`;

    
    return currentLondonTime >= examStartTime;
};

const isExamFinished = () => {
    // Get the current time in London time zone
    const currentLondonTime = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });
    
    // Extract the date part from examDetails.examDate
    const examDateOnly = new Date(examDetails.examDate).toISOString('en-GB').split('T')[0];
    
    // Split the date into its components (year, month, day) and reverse the order
    const [year, month, day] = examDateOnly.split("-");

    // Create the new formatted date string in "DD/MM/YYYY" format
    const formattedDate = `${day}/${month}/${year}`;

    // Assuming examDetails.startTime is a valid time in 24-hour format, e.g., "13:30"
    const examFinishTime = `${formattedDate}, ${examDetails.finishTime}:00`;

    return currentLondonTime >= examFinishTime;
};

const checkExamStatus = async () => {
    isExamStarted()
   // console.log('isExamStarts: ' + isExamStarted() + ', ' + 'isExamEnd: ' + isExamFinished())
    if (!examDetails) return; // Ensure examDetails is available before checking
    
    if(isExamStarted())
    {
        setexamStatusText('In Progress')
       // console.log('isExamStarts: ' + isExamStarted() + ', ' + 'isExamEnd: ' + isExamFinished())
        if(isExamFinished())
        {
            try {
                await axios.put(`${ENDPOINT_URL}/exam/update-exam-status/${examId}`);
                setexamStatusText('Finished')
                setexamStatus(true);
                clearInterval(intervalID);
            } catch (error) {
            console.error('Error updating exam status:', error);
            }
        }
    }
};

useEffect(() => {
    axios
        .get(`${ENDPOINT_URL}/exam/get-exam?examid=${examId}`)
        .then((response) => {
        setExamDetails(response.data);
        setExamAlerts(response.data.examAlerts)
        let latestExamStatus = response.data.isCompleted;

        if (latestExamStatus) {
            setexamStatusText('Finished');
            setexamStatus(true);
        } else {
            setexamStatusText('Not Started'); // Set status to 'Not Started' if the exam is not completed
        }

        setLoading(false); // Set loading to false when API call is complete
        })
        .catch((error) => {
        console.error('Error fetching exam details:', error);
        setLoading(false); // Set loading to false on error
        });
    }, [examId]);

    // Set up the interval when examDetails and examStatus are available and isExamEnd is false
    useEffect(() => {
    if (examDetails && !examStatus) {
        const intervalId = setInterval(checkExamStatus, 1000);
        setIntervalID(intervalId); // Store the interval ID in state

        return () => {
        clearInterval(intervalId); // Clear interval on component unmount or when examStatus changes
        };
    }
    }, [examDetails, examStatus]);

    useEffect(() => {
        // Check if there are examAlerts and examDetails are available
        if (examAlerts && examDetails) {
          const intervalId = setInterval(() => {
            // Filter the examAlerts to get the alerts that are active
            const activeAlerts = examAlerts.filter(isAlertActive);
    
            console.log(activeAlerts);
            // Update the visibleExamAlerts with the activeAlerts
            setVisibleExamAlerts(activeAlerts);
          }, 3000);
    
          return () => {
            clearInterval(intervalId); // Clear the interval on component unmount
          };
        }
      }, [examAlerts, examDetails]);
    

if (loading) {
    return (
    <Container className="mt-5 spinner">
        <Row className="justify-content-center">
        <Col xs="auto">
            <BeatLoader color={'#36D7B7'} css={override} loading={loading} size={15} />
            <p>Loading...</p>
        </Col>
        </Row>
    </Container>
    );
}

const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('en-GB'); // Use 'en-US' for US date format
};

const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const parsedHours = parseInt(hours, 10);
    const amOrPm = parsedHours >= 12 ? 'PM' : 'AM';
    const formattedHours = parsedHours % 12 || 12;
    return `${formattedHours}:${minutes} ${amOrPm}`;
};



return (
    <>
    <Container fluid className="d-flex p-0">
        <Container fluid className='home-body'>
        <Container fluid className='heading-home'>
            <h1>Exam Information</h1>
            
            {error && <Container className="mb-3 text-danger alert alert-danger alert-container">{error}</Container>}
            {examStatusText === 'Not Started' && <Container className="mb-3 text-danger alert alert-danger alert-container-danger">This Exam Has Not Started Yet!</Container>}
            {examStatusText === 'In Progress' && <Container className="mb-3 text-primary alert alert-primary alert-container-primary">This Exam is Currently in Progress</Container>}
            {examStatusText === 'Finished' && <Container className="mb-3 text-sucess alert alert-success alert-container-sucess">This Exam Ended on {examDetails.examDate}</Container>}
            <Row className="mt-3 d-flex justify-content-center align-items-center">
            <Card border="gray" className="text-center p-3 position-relative exam-card">
                <Card.Body>
                <Table responsive>
                    <tbody>
                    <tr>
                        <td className="text-start"><h3><strong>Module Name:</strong></h3></td>
                        <td className="text-start"><h3>{examDetails.moduleName}</h3></td>
                    </tr>
                    <tr>
                        <td className="text-start"><h3><strong>Exam Date:</strong></h3></td>
                        <td className="text-start"><h3>{formatDate(examDetails.examDate)}</h3></td>
                    </tr>
                    <tr>
                        <td className="text-start"><h3><strong>Exam Timings:</strong></h3></td>
                        <td className="text-start"><h3>{formatTime(examDetails.startTime)} - {formatTime(examDetails.finishTime)}</h3></td>
                    </tr>
                    </tbody>
                </Table>
                </Card.Body>
            </Card>
 
            </Row>
            <hr></hr>
        </Container>
        <Container fluid className='schedule-container'>
            
            <Container className='d-flex justify-content-center flex-column align-items-center'>
            {
                examStatusText === 'In Progress' && (
                    <>
                    
                    <Stopwatch className='stopwatch-container' startTime={examDetails.startTime} finishTime={examDetails.finishTime}/>
                        <Container className='exam-alerts-table'>
                               
                                {visibleExamAlerts ? (
                                    <>
                                     <h2>Exam Alerts:</h2>
                                        <Table>
                                        <tbody>
                                          {visibleExamAlerts.map((alert) => (
                                            <tr
                                            key={alert._id}
                                            className={alert.alert.alertType === 'allowed' ? 'text-primary alert alert-success alert-container-success' : 'text-primary alert alert-danger alert-container-danger'}
                                          >
                                              <td>
                                                {alert.alert.alertLogo && (
                                                  <img
                                                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                                    src={ENDPOINT_URL + '/alert-logos/' + (alert.alert.alertLogo || '')}
                                                    alt="Alert Logo"
                                                  />
                                                )}
                                              </td>
                                              <td>{alert.alert.alertName}</td>
                                              <td style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                                                {alert.alert.alertDescription}
                                              </td>
                                              <td>
                                                <strong>From {formatTime(alert.startTime)} till {formatTime(alert.finishTime)}</strong>
                                            </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </Table>
                                      </>
                                ) : (
                                    null
                                )}
                        </Container>
                        
                    </>
                )
            }
            
            </Container>
        </Container>
        </Container>
    </Container>
    </>
);
};

export default PublicExam;
