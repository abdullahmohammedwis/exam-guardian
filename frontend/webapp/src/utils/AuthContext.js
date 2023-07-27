import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const jwtToken = Cookies.get('jwt');
    setisLoggedIn(!!jwtToken); // Convert jwtToken to boolean
  }, []);

  const handleLogin = (token) => {
    Cookies.set('jwt', token, { expires: 1, sameSite: 'strict' });
    toast.success('Successfully Logged In');
    setisLoggedIn(true);
  };

  const handleLogout = () => {
    Cookies.remove('jwt');
    setisLoggedIn(false);
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
