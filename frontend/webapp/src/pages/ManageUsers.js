import React, {  useState } from 'react';
import { Table, Container,  Button,  Form } from 'react-bootstrap';
import userimage from '../images/user-default.svg';
import '../assets/Users.css';
import editpen from '../images/edit-pen.png';

import UserDetailsModal from '../components/UserDetailsModal';




export default function UserInfoTable() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([
    { _id: 1, name: 'John Doe', email: 'john@example.com', isAdmin: true },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleUpdateUserArray = (updatedUserArray) => {
    setUsers(updatedUserArray);
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const addNewUser = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  // Filter the users based on the search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Container className="mt-5">
        <Container className="d-flex justify-content-between mb-3" fluid>
     
          <div className='ar-search-field search-bar'>
          <Form.Control
            type="text"
            className=' ar-form-control form-control '
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}

          />
           
        
        </div>
          <Button
            className="ar-btn ar-btn-secondary add_user"
            onClick={() => addNewUser()}
          >
            Add User
          </Button>
        </Container>

        <Table responsive>
        <thead className="table-head custom-table-head">
                <tr>
                  <th className='col-md-3'>Invigilator Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  
                </tr>
              </thead>
          <tbody className='custom-striped-table'>
            {filteredUsers.map((user) => (
              <tr key={user.id}>

                <td className='col-md-2'>
                  {user.name}
                </td>
                <td className='col-md-2'>
                  {user.email}
                </td>
                <td className='col-md-2'>
                  {user.isAdmin ? (
                    'Admin'
                  ):('Invigilator')}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <UserDetailsModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        selectedUser={selectedUser}
        userArray={users}
        handlearraychange={handleUpdateUserArray}
      />
    </>
  );
}
