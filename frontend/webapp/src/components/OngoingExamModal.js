import React, {useState} from 'react';
import { Modal, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import ENDPOINT_URL from '../utils/variables';
import Cookies from 'js-cookie';
const ExamModal = ({ exam, onClose }) => {
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-GB"); // Use 'en-US' for US date format
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [explanation, setExplanation] = useState('');

  const handleReportIssueClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleExplanationChange = (event) => {
    setExplanation(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedOption || !explanation) {
      // Validation check: Ensure both selectedOption and explanation are not empty
      console.log('Selected option and explanation cannot be empty.');
      // Optionally, show an error message to the user
      return;
    }

    const issue = selectedOption + ': ' + explanation;
    try {
      // Make an Axios API call to update the exam with the issue
      const response = await axios.put(`${ENDPOINT_URL}/exam/add-issue/${exam._id}`, { issue }, {
        headers: {
          'Content-Type': 'application/json', // Use application/json for JSON data
          'Authorization': Cookies.get('jwt')
        },
      });
      console.log('API Response:', response.data);

      // Handle any success actions here if needed
      // e.g., show a success message or update the UI
    } catch (error) {
      console.error('Error adding issue to the exam:', error);
      // Handle any error actions here if needed
      // e.g., show an error message to the user
    } finally {
      // Close the modal after the API call (whether success or error)
      handleCloseModal();
    }
  };

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Exam Details - {exam.moduleName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Exam Public URL: {`http://localhost:3000/examview/${exam._id}`}</h5>
        <h5>Exam Date: {formatDate(exam.examDate)}</h5>
        <h5>Total Students: {exam.totalStudents}</h5>
        <h5>Start Time: {exam.startTime} - Finish Time: {exam.finishTime}</h5>
       
        <hr />
        <h5>Exam Alerts:</h5>
        {exam.examAlerts.alert != null && Array.isArray(exam.examAlerts.alert) && exam.examAlerts.alert.length > 0 ? (
  <ul>
    {exam.examAlerts.alert.map((alert) => (
      <li key={alert._id}>
        Start Time: {alert.startTime}, Finish Time: {alert.finishTime}
      </li>
    ))}
  </ul>
) : (
  <p>No Alerts Yet</p>
)}



        <hr />
        <h5>Exam Instructions:</h5>
        {console.log(exam.examInstructions)}
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          <ul>
            {exam.examInstructions.map((instruction) => (
              <li key={instruction._id}>
                <strong>{instruction.instructionName}</strong>
                <p>{instruction.instructionDescription}</p>
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <h5>Exam Issues:</h5>
        {exam.examIssues.length >=1 ? (
          <ul>
            {exam.examIssues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        ) : (
          <p>No issues occurred during this exam.</p>
        )}
        <Container fluid className='d-flex align-items-center justify-content-center flex-column'>
        {!isModalOpen ? (<Button variant="danger" onClick={handleReportIssueClick}>Report New Issue</Button>):
        (<Button variant="secondary" onClick={handleCloseModal}>Close</Button>)}
        </Container>
         {isModalOpen && (
         <Container className="mt-2 d-flex align-items-center justify-content-center flex-column">
          <h2>Report Issue</h2>
          <div>
            <label htmlFor="mr-2">Select Issue&nbsp;</label>
            <select id="pl-2" value={selectedOption} onChange={handleOptionChange}>
              <option value="">Select an option</option>
              <option value="Misconduct">Misconduct</option>
              <option value="Cheating">Cheating</option>
              <option value="Medical Emergency">Medical Emergency</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className='mt-2'>
            <span className='text-start'>Explanation</span>
            </div>
            <div>
            <textarea
              id="explanationTextarea"
              value={explanation}
              onChange={handleExplanationChange}
              rows="4"
              cols="50"
              placeholder="Enter your explanation here..."
            />
          </div>
          <Button onClick={handleSubmit}>Submit Issue</Button>
          </Container>)}
          
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close Exam Info</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExamModal;
