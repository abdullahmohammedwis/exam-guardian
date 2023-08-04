import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ExamModal = ({ exam, onClose }) => {
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-GB"); // Use 'en-US' for US date format
  };

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Exam Details - {exam.moduleName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Exam Date: {formatDate(exam.examDate)}</h5>
        <h5>Total Students: {exam.totalStudents}</h5>
        <h5>Start Time: {exam.startTime} - Finish Time: {exam.finishTime}</h5>
        <h5>Status: {exam.isCompleted ? "Finished" : "Not Completed"}</h5>
        <hr />
        <h5>Exam Alerts:</h5>
        <ul>
          {exam.examAlerts.map((alert) => (
            <li key={alert._id}>
              Start Time: {alert.startTime}, Finish Time: {alert.finishTime}
            </li>
          ))}
        </ul>
        <hr />
        <h5>Exam Instructions:</h5>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExamModal;
