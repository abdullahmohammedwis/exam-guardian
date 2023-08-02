const express = require('express');
const router = express.Router();
const Exam = require('../models/examSchema');
const authenticateToken = require('./token-authentication');
router.post('/schedule-exam', authenticateToken, async (req, res) => {
  try {
    const newExam = await Exam.create(req.body);
    res.status(201).json(newExam);
  } catch (error) {
    console.error('Error in creating exam:', error);
    res.status(500).json({ error: 'Failed to create exam' });
  }
});

router.get('/get-exam', async (req, res) => {
  try {
    const { examid } = req.query;

    // Find the exam by examId in the database
    const exam = await Exam.findById(examid)
      .populate('examAlerts.alert') 
      .populate('examInstructions');

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.json(exam); // Send the exam details as JSON response
  } catch (error) {
    console.error('Error fetching exam details:', error);
    res.status(500).json({ error: 'Failed to fetch exam details' });
  }
});

router.get('/get-all-exams', async (req, res) => {
  try {
    const exams = await Exam.find({}).populate('examAlerts.alert').populate('examInstructions');
    res.json(exams); // Send the exams as JSON response
  } catch (error) {
    console.error('Error fetching all exams:', error);
    res.status(500).json({ error: 'Failed to fetch all exams' });
  }
});

router.put('/update-exam-status/:examid', async (req, res) => {
  try {
    const { examid } = req.params;
    
    // Find the exam by examId in the database
    const exam = await Exam.findById(examid);

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Set isCompleted as true to mark the exam as completed
    exam.isCompleted = true;
    await exam.save();

    res.json({ message: 'Exam status updated successfully' });
  } catch (error) {
    console.error('Error updating exam status:', error);
    res.status(500).json({ error: 'Failed to update exam status' });
  }
});


module.exports = router;
