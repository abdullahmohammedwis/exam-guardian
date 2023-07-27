import React, {useEffect, useState} from 'react'
import { Container, Form, Button,Card } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext'
import axios from 'axios';
import '../assets/Login.css'
import ENDPOINT_URL from '../utils/variables';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const { isLoggedIn, handleLogin } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    let response; // Declare response variable in the outer scope
  
    try {
      response = await axios.post(`${ENDPOINT_URL}/auth/login`, {
        email,
        password,
      });
  
      const data = response.data;
      const status = response.status;
      console.log(status);
      if (status === 200) {
        handleLogin(data.token);
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Display the error message if login fails
        const data = error.response.data;
        setError(data.error || 'Authentication failed');
  
        // Show an error toast message
        toast.error('Login Failed: Invalid credentials');
      } else {
        console.error('Error during login:', error);
        setError('Failed to login. Please try again later.');
      }
    }
  
    setIsLoading(false);
  };
  
  

  return (
    <>
    <Container fluid className='login-container'>
        <Container className='heading_login'>
          <h1>Welcome to ExamGuardian!</h1>
          <p>Log into your invigilator account.</p>
        </Container>

        <Card className='login-card'>
          <Card.Body>
          {error && <Container className="mb-3 text-danger alert alert-danger alert-container">{error}</Container>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="form-label" controlId="formBasicEmail">
                <Form.Label >Email</Form.Label>
                <Form.Control className='w-100' type="email"
                  id="username"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  required placeholder="Your Email e.g. email@company.com"
                />
              </Form.Group>
              <Form.Group className="form-label" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  className="l" 
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  placeholder="Your Password"
                />
                <Button type="button" className="btn btn-link p-0 hidden-password" onClick={togglePasswordVisibility}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </Button>
              </Form.Group>
              
              {!isLoading ? (
                  <Button variant='primary' className='login-button' type="submit">
                    LOG IN
                  </Button>
              ):(
                <Button disabled className='login-button' type="submit">
                  LOADING...
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>
        <Toaster
          toastOptions={{
            success: {
            className: 'ar-toast-success',
            },
            error:{
              className:'ar-toast-error',
            }
          }}
        />
        
    </Container>
    </>
  );
}

export default Login