import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import ENDPOINT_URL from '../utils/variables';
import axios from 'axios';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const jwtToken = Cookies.get('jwt');
    setisLoggedIn(!!jwtToken); // Convert jwtToken to boolean
  }, []);

  const handleLogin = (token) => {
    // Store the JWT token in Cookies
    Cookies.set('jwt', token, { expires: 1, sameSite: 'strict' });
  
    // Make an API call to get user details
    axios.get(`${ENDPOINT_URL}/user/user-details`, {
      headers: {
        'Authorization': Cookies.get('jwt')
      }
    })
    .then(response => {
      console.log(response.data.user)
      sessionStorage.setItem('userDetails', JSON.stringify(response.data.user));
      // Notify user of successful login
      toast.success('Successfully Logged In');
  
      // Update isLoggedIn state
      setisLoggedIn(true);
    })
    .catch(error => {
      console.error(error);
      // Handle any error scenarios for login
    });
  };

  const handleLogout = () => {
    Cookies.remove('jwt');
    setisLoggedIn(false);
    sessionStorage.clear();
    toast.success("Logged Out Successfully");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
