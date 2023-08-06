# exam-guardian
For Coursework CSI_5_SFE 22-23

# Overview
"Exam Guardian" is a web-based application designed to streamline the exam management process for invigilator staff at universities. It offers a user-friendly interface, allowing staff to set up local exam information pages, embed university logos, and customize exam procedures.

# Features
- JWT Secure Login: Secure authentication system using JSON Web Tokens.
- Schedule Exam: Allows invigilators to schedule exams, set timers, and add custom alerts and instructions.
- Exam Logs: Provides a history of exam logs, detailing alerts, issues, and student attendance.
- Ongoing Exams: Allows users to log issues during ongoing exams.
- Managing Invigilators: Administrators can add new invigilators to the system.
- Public Exam View: Displays a dynamic timer, alerts, and instructions for students during exams.

# Technology Stack
- Frontend: React.js
- Backend: Express.js, Node.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)

# Installation

1. Clone the repository:
`git clone https://github.com/your-repo-link/exam-guardian.git`
2. Navigate to the project directory:
`cd exam-guardian`
3. Install the required packages for frontend and backend:
```
cd frontend/webapp
npm install

cd backend
npm install
```
4. Start both backend and frontend server:
- Frontend: `npm start`
- Backend: `npm run dev`

5. Usage
- Open a web browser and navigate to http://localhost:3000.
- Log in using your credentials.
- Use the dashboard to schedule exams, view logs, manage invigilators, and more.
