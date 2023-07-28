const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  alertName: { type: String, required: true },
  alertLogo: { type: String, required: true },
  alertDescription: { type: String, required: true },
  alertType: { type: String, required: true },
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
