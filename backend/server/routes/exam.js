const express = require('express');
const router = express.Router();
const Exam = require('../models/examSchema');

router.post('/schedule-exam', async (req, res) => {
  try {
    const newExam = await Exam.create(req.body);
    res.status(201).json(newExam);
  } catch (error) {
    console.error('Error in creating exam:', error);
    res.status(500).json({ error: 'Failed to create exam' });
  }
});

module.exports = router;
