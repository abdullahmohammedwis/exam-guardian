import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from '../utils/AuthContext'

const Home = () => {
  
  const { isLoggedIn, handleLogout } = useAuth();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This content is only visible if the user is logged in.</p>
    </div>
  );
};

export default Home;
