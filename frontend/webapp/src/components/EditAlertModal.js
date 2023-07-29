import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
const EditAlertModal = ({ showModal, setShowModal, selectedAlert, handleSaveChanges }) => {
    const [alertName, setAlertName] = useState('');
    const [alertDescription, setAlertDescription] = useState('');
    const [alertType, setAlertType] = useState('not_allowed');
    const [logoFile, setLogoFile] = useState(null);
  
    useEffect(() => {
      // Update the state when selectedAlert changes
      if (selectedAlert) {
        setAlertName(selectedAlert.alertName);
        setAlertDescription(selectedAlert.alertDescription);
        setAlertType(selectedAlert.alertType);
        setLogoFile(null); // Reset the logoFile when a new alert is selected
      }
    }, [selectedAlert]);
  
    const handleLogoChange = (event) => {
      // Get the selected file from the file input
      const file = event.target.files[0];
      setLogoFile(file);
    };
  
    const handleSave = () => {
        const updatedAlert = {
          _id: selectedAlert ? selectedAlert._id : null,
          alertName,
          alertDescription,
          alertType,
          logoFile,
        };
      
        handleSaveChanges(updatedAlert);
        setShowModal(false);
      };
      
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Alert</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="alertName">
            <Form.Label>Alert Name</Form.Label>
            <Form.Control
              type="text"
              value={alertName}
              onChange={(e) => setAlertName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="alertDescription">
            <Form.Label>Alert Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={alertDescription}
              onChange={(e) => setAlertDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="alertType">
            <Form.Label>Alert Type</Form.Label>
            <Form.Control
              as="select"
              value={alertType}
              onChange={(e) => setAlertType(e.target.value)}
            >
              <option value="not_allowed">Not Allowed</option>
              <option value="allowed">Allowed</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Upload Logo</Form.Label>
            <Form.Control type="file" onChange={handleLogoChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAlertModal;
