const express = require('express');
const router = express.Router();
const authenticateToken = require('./token-authentication');

// Import the Instruction model
const Instruction = require('../models/instructionSchema');

// Route to get all instructions
router.get('/get-instructions', authenticateToken,async (req, res) => {
  try {
    // Fetch all instructions from the database
    const instructions = await Instruction.find();

    res.json(instructions); // Send the instructions as JSON response
  } catch (error) {
    console.error('Error fetching instructions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to add a new instruction
router.post('/add-instruction', authenticateToken, async (req, res) => {
    try {
      const { instructionName, instructionDescription } = req.body;
  
      // Create a new Instruction object
      const newInstruction = new Instruction({
        instructionName,
        instructionDescription,
      });
  
      // Save the new instruction to the database
      const savedInstruction = await newInstruction.save();
  
      res.json(savedInstruction); // Send the saved instruction as JSON response
    } catch (error) {
      console.error('Error adding instruction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
