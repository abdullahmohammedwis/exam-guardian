import React, { useState, useEffect } from 'react';
import '../assets/ScheduleExam.css';
import toast, { Toaster } from 'react-hot-toast';
import { Container, Card, Row, Col, Table, Button} from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import ENDPOINT_URL from '../utils/variables';
import '../assets/ScheduleExam.css'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditAlertModal from '../components/EditAlertModal';
import Cookies from 'js-cookie';
const AlertTemplate = () => {
    
    const [showModal, setShowModal] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState(null);

    const handleRowClick = (alert) => {
        setSelectedAlert(alert);
        setShowModal(true);
    };

  const handleAddNewAlert = () => {
    setSelectedAlert(null); // Reset selectedAlert when adding a new alert
    setShowModal(true);
  };


  const [error, setError] = useState('');
  const [alerts, setAlerts] = useState([]);
  const sidebarMenuItems = [
    { href: '/schedule-exam', name: 'SCHEDULE EXAM', icon: 'info-circle' },
    { href: '/manage-alert', name: 'ALERT TEMPLATES', icon: 'cog' },
    { href: '/manage-instruction', name: 'INSTRUCTION TEMPLATES', icon: 'cog' },
  ];

  useEffect(() => {
    // Fetch the added alerts from the backend API
    axios
      .get(`${ENDPOINT_URL}/alert/get-alerts`, { 
        headers: {
        'Authorization': Cookies.get('jwt')
      }
    })
      .then((response) => {
        setAlerts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching alerts:', error);
        setError('Failed to fetch alerts from the server.');
      });
  }, []);

  
  const handleSaveChanges = async (updatedAlert) => {
    try {
        // Create a FormData object to send the file along with other form data
        const formData = new FormData();
        formData.append('alertName', updatedAlert.alertName);
        formData.append('alertDescription', updatedAlert.alertDescription);
        formData.append('alertType', updatedAlert.alertType);
    
        if (updatedAlert.logoFile) {
          formData.append('alertLogo', updatedAlert.logoFile);
        }
    
        // If selectedAlert exists and has an _id, it means it's an existing alert, and we update it
        if (selectedAlert && selectedAlert._id) {
          const alertId = selectedAlert._id;
    
          // Call the API to update the existing alert with the updatedAlert data
          await axios.put(`${ENDPOINT_URL}/alert/update/${alertId}`, formData, {
            headers: {
              'Authorization': Cookies.get('jwt')
            }
          });
    
          // Update the 'alerts' state with the edited alert data
          setAlerts((prevAlerts) =>
            prevAlerts.map((alert) => (alert._id === alertId ? { ...alert, ...updatedAlert } : alert))
          );
    
          toast.success('Alert Updated Successfully!');
          console.log('Updated Alert:', updatedAlert);
        } else {
        // If selectedAlert is null or doesn't have an _id, it means it's a new alert
        // We can directly add the new alert to the server using API call
        const formData = new FormData();
        formData.append('alertName', updatedAlert.alertName);
        formData.append('alertDescription', updatedAlert.alertDescription);
        formData.append('alertType', updatedAlert.alertType);
        if (updatedAlert.logoFile) {
          formData.append('alertLogo', updatedAlert.logoFile);
        }
  
        const response = await axios.post(`${ENDPOINT_URL}/alert/add`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': Cookies.get('jwt')
          },
        });
        // Update the 'alerts' state with the new alert data received from the server
        setAlerts((prevAlerts) => [...prevAlerts, response.data]);
        toast.success('Alert Added Successfully!')
        console.log('New Alert:', response.data);
      }
  
      // Close the modal
      setShowModal(false);
    } catch (error) {
        toast.error('An error occured, please try again!')
      console.error('Error saving alert:', error);
    }
  };
  
  
  return (
    <>
      <Container fluid className="d-flex p-0">
        <Sidebar heading="ALERT TEMPLATES" menuItems={sidebarMenuItems} selectedIndex={1} />
        <Container fluid className="home-body">
          <Container className="heading-home">
            <h1>Manage Your Alert Templates</h1>
            <p>Preconfigure Alerts to Add in the Exams</p>
            <hr />
            {error && (
              <Container className="mb-3 text-danger alert alert-danger alert-container">{error}</Container>
            )}
          </Container>
          <Container className="schedule-container">
            <Container>
              <Row className="mb-0 label">
                <Col>
                  <h6>Manage Alert Templates</h6>
                </Col>
              </Row>
              <Card border="gray" className="text-center p-3 position-relative alert-card">
                <Card.Body>
                  {/* Display the fetched alerts here */}
                  {alerts.length > 0 ? (
                    <Table responsive>
                      <thead className="table-head custom-table-head">
                        <tr>
                          <th>Logo</th>
                          <th>Alert Name</th>
                          <th>Alert Description</th>
                          <th>Alert Type</th>
                        </tr>
                      </thead>
                      <tbody className='custom-striped-table'>
                        {alerts.map((alert) => (
                          <tr key={alert._id} onClick={() => handleRowClick(alert)}>
                            <td>
                              {alert.alertLogo && (
                                <img
                                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                  src={ENDPOINT_URL + '/alert-logos/' + (alert.alertLogo || '')}
                                  alt="Alert Logo"
                                />
                              )}
                            </td>
                            <td>{alert.alertName}</td>
                            <td style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                              {alert.alertDescription}
                            </td>
                            <td>
                            {alert.alertType === "not_allowed" ? (
                                <>
                                <FontAwesomeIcon icon={faTimesCircle} style={{ marginRight: '5px' }} />
                                Not Allowed
                                </>
                            ) : (
                                <>
                                <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '5px' }} />
                                {alert.alertType.charAt(0).toUpperCase() + alert.alertType.slice(1)}
                                </>
                            )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p>No alerts available.</p>
                  )}
                </Card.Body>
              </Card>
              <Row className="mt-3">
                <Col>
                  <Button variant="primary" onClick={handleAddNewAlert}>
                    Add New Alert
                  </Button>
                </Col>
              </Row>
            </Container>
          </Container>
        </Container>
        
      </Container>
      <EditAlertModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedAlert={selectedAlert}
        handleSaveChanges={handleSaveChanges}
        />
        <Toaster/>
    </>
  );
};

export default AlertTemplate;
