import React, { useState, useEffect } from 'react';
import { Form, Container, Card, Row, Col, Button, Modal } from 'react-bootstrap';
import '../assets/ScheduleExam.css';
import axios from 'axios';
import ENDPOINT_URL from '../utils/variables';
const AlertsCard = ({ addedAlertsData, onAlertsChange }) => {

  const [availableAlerts, setAvailableAlerts] = useState([]);

  const [addedAlerts, setAddedAlerts] = useState([]);

  const [selectedAlert, setSelectedAlert] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [startTime, setStartTime] = useState('');
  const [finishTime, setFinishTime] = useState('');

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleFinishTimeChange = (event) => {
    setFinishTime(event.target.value);
  };


  const handleAlertButtonClick = (alert) => {
    setSelectedAlert(alert);
    setShowModal(true);
  };

  const handleAddAlert = () => {
    if (selectedAlert) {
      setAddedAlerts((prevAddedAlerts) => [...prevAddedAlerts, selectedAlert]);
      setSelectedAlert(null);
      setShowModal(false);
      const newAddedAlert = {
        alertId: selectedAlert._id,
        startTime: startTime, 
        finishTime: finishTime,
      };
      onAlertsChange([...addedAlertsData, newAddedAlert]);
      setStartTime('');
      setFinishTime('');
    }
  };

  const handleUndo = () => {
    if (addedAlerts.length > 0) {
      const updatedAddedAlerts = addedAlerts.slice(0, addedAlerts.length - 1);
      setAddedAlerts(updatedAddedAlerts);
      onAlertsChange(updatedAddedAlerts);
    }
  };

  const handleCloseModal = () => {
    setSelectedAlert(null);
    setShowModal(false);
  };

  useEffect(() => {
    axios
      .get(`${ENDPOINT_URL}/alert/get-alerts`)
      .then((response) => {
        setAvailableAlerts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching alerts:', error);
      });
  }, []); 
  
  return (
    <Container className='mt-3'>
      <Row className="mb-0 label">
        <Col>
          <h6>Exam Alerts</h6>
        </Col>
      </Row>
      <Card border="gray" className="text-center p-3 position-relative alerts-card">
        <Card.Body>
          <Form>
            <Form.Group>
            
              <Row className='d-flex flex-column'>
              <Col>
                  <h6>Added Alerts</h6>
                  {addedAlerts.length > 0 ? (
                    addedAlerts.map((alert) => (
                      <Button className='m-1' key={alert._id} variant="primary" disabled>
                        {alert.alertName}
                      </Button>
                    ))
                  ) : (
                    
                      <p>No Alerts Added</p>
                    
                  )}
                </Col>
                <hr className='mt-3 mb-3'></hr>
                <Col>
                  <h6>Available Alerts</h6>
                  {availableAlerts.map((alert) => (
                    <Button className='m-1' key={alert._id} variant="outline-primary" onClick={() => handleAlertButtonClick(alert)}>
                      {alert.alertName}
                    </Button>
                  ))}
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Card.Body>
            {addedAlerts.length > 0 && (
            <Row className="mt-2 mb-2 d-flex align-items-center justify-content-center sc-button-danger">
            <Button variant="danger" onClick={handleUndo}>
                Undo
            </Button>
            </Row>
        )}
      </Card>

      {/* Modal for adding alerts */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedAlert?.alertName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Description: {selectedAlert?.alertDescription}</p>
          <p>Icon:</p>
          <img
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            src={ENDPOINT_URL + '/alert-logos/' + (selectedAlert?.alertLogo || '')}
            alt="Icon Not Available"
            />
          <Form.Group controlId="startTime">
            <Form.Label>Start Time</Form.Label>
           
            <Form.Control
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
              required
              />
          </Form.Group>
          <Form.Group controlId="finishTime">
            <Form.Label>Finish Time</Form.Label>
            <Form.Control
              type="time"
              value={finishTime}
              onChange={handleFinishTimeChange}
              required
              />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddAlert}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AlertsCard;
