import React, {useEffect, useState} from 'react'
import { Container, Form, Button,Card } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import '../assets/Login.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
  }

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
                  required placeholder="E.g. email@company.com"
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
                />
                <Button type="button" className="btn btn-link p-0 hidden-password" onClick={togglePasswordVisibility}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </Button>
              </Form.Group>
              
              {!isLoading ? (
                  <Button className='ar-btn ar-btn-group ar-btn-secondary login-button' type="submit">
                    LOG IN
                  </Button>
              ):(
                <Button disabled className='ar-btn ar-btn-group ar-btn-secondary login-button' type="submit">
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
            position:'bottom-left'
            },
            error:{
              className:'ar-toast-error',
              position:'bottom-left'
            }
          }}
        />
        
    </Container>
    </>
  );
}

export default Login