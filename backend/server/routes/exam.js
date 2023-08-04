const express = require('express');
const router = express.Router();
const Exam = require('../models/examSchema');
const authenticateToken = require('./token-authentication');
const moment = require('moment-timezone');
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

router.get('/get-all-exams', authenticateToken, async (req, res) => {
  try {
    const exams = await Exam.find({}).populate('examAlerts.alert').populate('examInstructions');
    res.json(exams); // Send the exams as JSON response
  } catch (error) {
    console.error('Error fetching all exams:', error);
    res.status(500).json({ error: 'Failed to fetch all exams' });
  }
});

router.get('/get-ongoing-exams', authenticateToken, async (req, res) => {
  try {
    const currentLondonTime = moment().tz("Europe/London").format('HH:mm');
    const currentDate = moment().tz("Europe/London").format('YYYY-MM-DD');
    const data = await Exam.aggregate([
      {
        $match: {
          examDate: { $eq: new Date(currentDate) },
          startTime: { $lte: currentLondonTime },
          finishTime: { $gte: currentLondonTime },
        },
      },
      {
        $lookup: {
          from: 'alerts', // Assuming the model name for the alerts is 'Alert'
          localField: 'examAlerts.alert',
          foreignField: '_id',
          as: 'examAlerts.alert',
        },
      },
      {
        $lookup: {
          from: 'instructions', // Assuming the model name for the instructions is 'Instruction'
          localField: 'examInstructions',
          foreignField: '_id',
          as: 'examInstructions',
        },
      },
    ]);
    
    
    res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
});

router.put('/update-exam-status/:examid', authenticateToken,async (req, res) => {
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

router.put('/add-issue/:examid', authenticateToken,async (req, res) => {
  try {
    const { examid } = req.params;
    const { issue } = req.body; 
    console.log('hs' + issue)
    // Find the exam by examId in the database
    const exam = await Exam.findById(examid);

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Add the issue to the exam's examIssues array
    exam.examIssues.push(issue);

    await exam.save();

    res.json({ message: 'Issue added to the exam successfully' });
  } catch (error) {
    console.error('Error adding issue to the exam:', error);
    res.status(500).json({ error: 'Failed to add issue to the exam' });
  }
});

module.exports = router;
