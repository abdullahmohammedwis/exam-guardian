import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ScheduleExam from './pages/ScheduleExam';
import Navbar from './components/CustomNavbar';
import AuthGuard from './utils/AuthGuard';
import AlertTemplate from './pages/AlertTemplate';
import InstructionTemplate from './pages/InstructionTemplate';
import PublicExam from './pages/PublicExam';
import ExamLogs from './pages/ExamLogs';
const App = () => {
  return (
    <BrowserRouter>
      <AuthGuard>
      <Navbar/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/schedule-exam" element={<ScheduleExam />} />
          <Route path="/manage-alert" element={<AlertTemplate />} />
          <Route path="/manage-instruction" element={<InstructionTemplate />} />
          <Route path="/examview/:examId" element={<PublicExam />} />
          <Route path="/exam-logs" element={<ExamLogs />} />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  );
};

export default App;
