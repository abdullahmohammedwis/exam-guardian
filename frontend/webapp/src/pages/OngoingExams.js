import React, { useState, useEffect } from 'react';
import { Container, Table, Pagination } from 'react-bootstrap';
import axios from 'axios';
import ENDPOINT_URL from '../utils/variables';
import OngoingExamModal from '../components/OngoingExamModal';
import Cookies from 'js-cookie';
const OngoingExams = () => {
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
        const response = await axios.get(`${ENDPOINT_URL}/exam/get-ongoing-exams`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': Cookies.get('jwt')
            },
          });
        setExamData(response.data.data);
        
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

  function convertToAmPm(timeString) {
    const [hours, minutes] = timeString.split(':');
    let suffix = 'AM';
    let hour = parseInt(hours, 10);
  
    if (hour >= 12) {
      suffix = 'PM';
      hour %= 12;
    }
  
    if (hour === 0) {
      hour = 12;
    }
  
    return `${hour}:${minutes} ${suffix}`;
  }
  
  return (
    <Container fluid className="d-flex p-0">
      <Container fluid className='d-flex flex-column justify-content-start align-items-center home-body'>
        <Container fluid className='heading-home'>
          <h1>Ongoing Exams</h1>
          <p>Here You Can View the Exams that are in progress</p>
          <p>Click an Exam To view Further Details or Add an Issue to it</p>
          {error && <Container className="mb-3 text-danger alert alert-danger alert-container">{error}</Container>}
          <hr></hr>
        </Container>
        <Container fluid className='schedule-container'>
          {examData.length > 0 ? (
            <Table responsive style={{ width: '1500px' }}>
              <thead className="table-head custom-table-head">
                <tr>
                  <th className='col-md-3'>Module</th>
                  <th>Date Scheduled</th>
                  <th>#. Students</th>
                  <th>Time</th>
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
                      {convertToAmPm(exam.startTime)} - {convertToAmPm(exam.finishTime)}
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
        <OngoingExamModal exam={selectedExam} onClose={() => setSelectedExam(null)} />
        
      )}
      </Container>
    </Container>
  );
}

export default OngoingExams;
