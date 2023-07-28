import React, { useState, useEffect } from 'react';
import { Form, Container, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../assets/ScheduleExam.css';
import ENDPOINT_URL from '../utils/variables';

const InstructionsCard = ({ setInstructions }) => {
  const [selectedInstructionTemplate, setSelectedInstructionTemplate] = useState('');
  const [instructionTemplates, setInstructionTemplates] = useState([]);

  const handleInstructionTemplateChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedInstructionTemplate(selectedValue);
    setInstructions(selectedValue);
  };

  useEffect(() => {
    // Fetch instruction templates from the API
    axios
      .get(`${ENDPOINT_URL}/instruction/get-instructions`)
      .then((response) => {
        setInstructionTemplates(response.data);
      })
      .catch((error) => {
        console.error('Error fetching instruction templates:', error);
      });
  }, []);

  return (
    <Container>
      <Row className="mb-0 label">
        <Col>
          <h6>Exam Instructions</h6>
        </Col>
      </Row>
      <Card border="gray" className="text-center p-3 position-relative instructions-card">
        <Card.Body>
          <Form>
            <Form.Group controlId="moduleName">
              <Form.Label className="mt-1 d-flex align-items-start">
                Select the Instruction Template<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="select"
                value={selectedInstructionTemplate}
                onChange={handleInstructionTemplateChange}
                required
              >
                <option value="">Select an Instruction Template</option>
                {instructionTemplates.map((template) => (
                  <option key={template._id} value={template._id}>
                    {template.instructionName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default InstructionsCard;
