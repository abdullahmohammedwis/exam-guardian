import React, { useState, useEffect } from 'react';
import { Container, Table, Pagination } from 'react-bootstrap';
import axios from 'axios';
import ENDPOINT_URL from '../utils/variables';
import ExamModal from '../components/ExamModal';
const ExamLogs = () => {
  const [error, setError] = useState('');
  const [examData, setExamData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedExam, setSelectedExam] = useState(null);
  const handleFirst = () => setCurrentPage(1);
  const handlePrev = () => setCurrentPage((old) => Math.max(old - 1, 1));
  const handleNext = () => setCurrentPage((old) => Math.min(old + 1, Math.ceil(examData.length / itemsPerPage)));
  const handleLast = () => setCurrentPage(Math.ceil(examData.length / itemsPerPage));

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`${ENDPOINT_URL}/exam/get-all-exams`);
        setExamData(response.data);
      } catch (error) {
        console.error('Failed to fetch exams:', error);
        setError('Failed to fetch exams');
      }
    };
    fetchExams();
  }, []);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-GB"); // Use 'en-US' for US date format
  };

  const handleExamClick = (exam) => {
    setSelectedExam(exam);
  };

  return (
    <Container fluid className="d-flex p-0">
      <Container fluid className='d-flex flex-column justify-content-center align-items-center home-body'>
        <Container fluid className='heading-home'>
          <h1>Exam Logs</h1>
          <p>Here You Can View Logs of Exams!</p>
          <p>Click an Exam To view Further Details</p>
          {error && <Container className="mb-3 text-danger alert alert-danger alert-container">{error}</Container>}
          <hr></hr>
        </Container>
        <Container fluid className='schedule-container'>
          {examData.length > 0 ? (
            <Table responsive style={{ width: '1500px' }}>
              <thead className="table-head custom-table-head">
                <tr>
                  <th className='col-md-3'>Module</th>
                  <th>Date Held</th>
                  <th>#. Students</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className='custom-striped-table'>
                {examData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((exam) => (
                  <tr key={exam._id} onClick={() => handleExamClick(exam)}>
                    <td>
                      {exam.moduleName}
                    </td>
                    <td>
                      {formatDate(exam.examDate)}
                    </td>
                    <td>
                      {exam.totalStudents}
                    </td>
                    <td>
                      {exam.isCompleted ? (<span>Finished</span>) : (<span>Not Completed</span>)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No alerts available.</p>
          )}
          
        </Container>
        <Pagination>
            <Pagination.First onClick={handleFirst} />
            <Pagination.Prev onClick={handlePrev} />
            <Pagination.Item>{currentPage}</Pagination.Item>
            <Pagination.Next onClick={handleNext} />
            <Pagination.Last onClick={handleLast} />
          </Pagination>
          {selectedExam && (
        <ExamModal exam={selectedExam} onClose={() => setSelectedExam(null)} />
      )}
      </Container>
    </Container>
  );
}

export default ExamLogs;
