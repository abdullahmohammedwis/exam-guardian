import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/CustomNavbar';
import AuthGuard from './utils/AuthGuard';

const App = () => {
  return (
    <BrowserRouter>
    
      <AuthGuard>
      <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  );
};

export default App;
