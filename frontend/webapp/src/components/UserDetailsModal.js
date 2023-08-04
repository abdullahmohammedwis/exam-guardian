import React, { useState, useEffect } from 'react';
import { Modal, Container, Row, Col, Form, Button, Card,OverlayTrigger, Popover } from 'react-bootstrap';
import cardimage from '../images/cardimage.svg'; // Make sure to provide the correct path to the image

const UserDetailsModal = ({ showModal, handleCloseModal, selectedUser,userArray, handlearraychange }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State for enable/disable
  const [isNew, setIsNew] = useState(false); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newpass, setNewpass] = useState('');



  // Add the changefield state
  const [changefield, setChangefield] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  // Function to handle changes in the form fields and set changefield to true
  const handleNameChange = (e) => {
    setName(e.target.value);
    setChangefield(true);
  };
  

  const newpasschange = (e) => {
    setNewpass(e.target.value);
  
  };




  // Function to handle ID and Slack ID changes
  const handlePasswordChange = (e) => {
    
    setPassword(e.target.value);
    setChangefield(true);
  };
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setChangefield(true);
  };
  

  const handleChange = (e) => {

    if(isNew){
      
      userArray.push({
        
        name: name,
        email: email,
        isAdmin: isAdmin
      });
      handlearraychange(userArray);
    }
    handleCloseModal();
  };


  const popoverContent = (
    <Popover id="popover-reset-password" className='reset_popover'>
      
      <Popover.Body>
      Reset Password:
        <Card>
        <Row>
          <Col>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="ar-search-field ar-form-group input-back"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="ar-search-field ar-form-group input-back"
            />
          </Col>
        </Row>

            <Button className="ar-btn ar-btn-group ar-btn-outline-primary reset_button " >
          Reset Password
        </Button>
        </Card>
       

      </Popover.Body>
    </Popover>
  );
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setChangefield(true);
  };
  const handleResetPasswordClick = () => {
    setShowPopover(!showPopover);
  };
  // Toggle the isEnabled state when the switch is clicked
  const handleStatusToggle = () => {
    setIsAdmin(!isAdmin);
    setChangefield(true);
  };

  // Set the field values based on the selected user when the modal is shown
  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setIsAdmin(selectedUser.isAdmin === true);
    }
    else{
     
    
      setName('');
     
      setEmail('');
      setIsAdmin(false);

    }
  }, [selectedUser]);

  return (
    <Modal show={showModal} onHide={handleCloseModal} enforceFocus={false} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      {  (
        <Modal.Body className='background-model'>
          <Container className="row">
            <Container className="col-12 col-md-3">
              <Card className="d-flex justify-content-center align-items-center p-3">
                <Card.Img src={cardimage} className="w-60 p-3 border-0" alt="User" />
                <Card.Text className="text-center">
                  {/* {username} */}
                </Card.Text>
              </Card>
            </Container>
            <Container className="col-12 col-md-9">
              <Card className="d-flex justify-content-center align-items-center  p-3">
                <Container>
                  <Row >
                    <Col className='col-md-9'>
                      <Form.Control
                        placeholder="NAME"
                        value={name}
                        onChange={handleNameChange}
                        className="ar-search-field ar-form-group input-back"
                      />
                    </Col>
                    <Col className='col-md-3 mt-1 '>
                     
                      <Form.Check
                        type="switch"
                        id="statusSwitch"
                        label={isAdmin ? 'Admin' : 'Invigilator'}
                        checked={isAdmin}
                        onChange={handleStatusToggle}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {/* <Form.Control
                        placeholder="USERNAME"
                        value={username}
                        onChange={handleUsernameChange}
                        className="ar-search-field ar-form-group input-back"
                      /> */}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        className="ar-search-field ar-form-group input-back"
                      />
                    </Col>
                    {isNew && (
                      <Col>
                      <Form.Control
                        placeholder="Password"
                        value={newpass}
                        onChange={newpasschange}
                        className="ar-search-field ar-form-group input-back"
                      />
                    </Col>
                    
                    
                    
                    
                    )}
                  
                  </Row>
                 
                </Container>
              </Card>
              {!isNew && (
              <Container fluid className='mt-2'>
                <p className='mb-0'>Reset Password</p>
                <Card className='mt-2 reset_password'> 
                  <Container className='d-flex align-items-center'> 
                    <span>
                      Username
                    </span>
                    <span className='lightfont'>
                      (set by user):
                    </span>
                    <span className='lightfont'>
                      {email}
                    </span>
                    <OverlayTrigger
                    show={showPopover}
                    placement="top"
                    overlay={popoverContent}
                    rootClose
                    html={true}
                    trigger="click"
                    onHide={() => setShowPopover(false)}
                  >
                    <Button className='ar-btn ar-btn-group ar-btn-outline-primary ' onClick={handleResetPasswordClick}>
                      Reset Password
                    </Button>
                  </OverlayTrigger>
                  </Container>
                </Card>
              </Container>
            )}


            </Container>
          </Container>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Container className="d-flex justify-content-between align-items-center w-100">
          {!isNew ? (
            <Button className='ar-btn ar-btn-group ar-btn-secondary' onClick={handleChange}>
            Update User
          </Button>
        ) : (
          <Button className='ar-btn ar-btn-group ar-btn-secondary' onClick={handleChange}>
            New User 
          </Button>
        )}
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailsModal;
