// routes/authentication.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/userSchema');
const authenticateToken = require('./token-authentication');
const secretKey = process.env.SECRET_KEY;

// Authentication routes
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login Request: ' + email + ',' + password)
    try {
      // Find the user in the database by their email
      const user = await User.findOne({ email });
  
      if (!user || user.password !== password) {
        // Authentication failed
        res.status(401).json({ error: 'Authentication failed' });
        console.log('Response: Invalid User/Pass')
        
        return;
      }
  
      // Generate JWT token with user information
      const token = jwt.sign({ data: user }, secretKey, { expiresIn: '1h' });
  
      // Send the token as a response
      res.json({ token });
    } catch (error) {
      console.error(error);
      console.log('Response: ' + 'Internal server error')
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/add-user', authenticateToken, async (req, res) => {
    try {
      // Check if the user is an admin
      console.log(req.user)
      if (!req.user.data.isAdmin) {
        return res.status(403).json({ error: 'You do not have admin privileges' });
      }
  
      // Extract user data from the nested "data" object
      const userData = req.body.data;
  
      // Create a new user using the User model
      const newUser = new User({
        fullName: userData.full_name,
        email: userData.email,
        password: userData.password,
        isAdmin: userData.is_admin || false,
      });
  
      // Save the user to the database
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add user' });
    }
  });
  

  router.delete('/delete-user/:userId', authenticateToken, async (req, res) => {
    try {
      // Check if the user is an admin
      if (!req.user.data.isAdmin) {
        return res.status(403).json({ error: 'You do not have admin privileges' });
      }
  
      // Extract the user ID from the URL parameters
      const userId = req.params.userId;
  
      // Find the user in the database by their ID
      const user = await User.findById(userId);
  
      // If the user with the provided ID doesn't exist, return an error
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Delete the user from the database
      await user.remove();
  
      // Return a success message
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });
  
module.exports = router;
