const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/userSchema');
const authenticateToken = require('./token-authentication');

router.get('/user-details', authenticateToken, async (req, res) => {
    try {
      // Get the user ID from the decoded token
      const userId = req.user.data._id;
  
      // Find the user in the database by their ID
      const user = await User.findById(userId);
  
      // If the user with the provided ID doesn't exist, return an error
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Return the user details
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get user details' });
    }
  });
  
  module.exports = router;