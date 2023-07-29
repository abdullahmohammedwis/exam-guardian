import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthGuard = ({ children }) => {
  const jwtToken = Cookies.get('jwt');
  const isLoggedIn = jwtToken;
  const navigate = useNavigate();
  const location = useLocation();

  // Define the paths that should be publicly accessible (exclude PublicExam route)
  const publicPaths = ['/examview'];
  console.log(location.pathname)
  useEffect(() => {
    // If the user is not logged in and the current path is not publicly accessible, redirect to the login page
    if (!isLoggedIn && !location.pathname.includes(publicPaths)) {
      navigate('/login');
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return <>{children}</>;
};

export default AuthGuard;
