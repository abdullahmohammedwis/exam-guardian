const mongoose = require('mongoose');

const examAlertSchema = new mongoose.Schema({
  alert: { type: mongoose.Schema.Types.ObjectId, ref: 'Alert' },
  startTime: { type: String, required: true },
  finishTime: { type: String, required: true },
});

const examSchema = new mongoose.Schema({
  moduleName: { type: String, required: true },
  examDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  finishTime: { type: String, required: true },
  totalStudents: { type: Number, required: true, min: 1 },
  isCompleted: { type: Boolean, default: false },
  examAlerts: [examAlertSchema], // Array of objects containing alert and its time details
  examInstructions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instruction' }],
  examIssues: [{ type: String}],
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
