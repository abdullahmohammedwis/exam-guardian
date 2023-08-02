const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// Import the Alert model
const Alert = require('../models/alertSchema');
const authenticateToken = require('./token-authentication');
// Set up the multer storage configuration to save the uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'alert-logos'); // Folder where files will be saved
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

// Initialize multer upload instance
const upload = multer({ storage });
const fs = require('fs');

// Route to get the alerts list
router.get('/get-alerts', authenticateToken, async (req, res) => {
  try {
    // Fetch all alerts from the database
    const alerts = await Alert.find();

    // Create an array to store the alerts with logo URLs
    const alertsWithLogos = [];

    // Loop through each alert and get the URL of the logo file
    for (const alert of alerts) {
      const logoFilePath = path.join(__dirname, 'alert-logos', alert.alertLogo);
      if (fs.existsSync(logoFilePath)) {
        // If the logo file exists, add the URL to the alert object
        alert.logoUrl = `/alert-logos/${alert.alertLogo}`;
      } else {
        // If the logo file does not exist, set the URL to null or a default image URL
        alert.logoUrl = null; // You can set a default image URL here if needed
      }
      alertsWithLogos.push(alert);
    }

    res.json(alertsWithLogos); // Send the alerts with logo URLs as JSON response
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to add a new alert
router.post('/add', authenticateToken, upload.single('alertLogo'), async (req, res) => {
    try {
      const { alertName, alertDescription, alertStartTime, alertEndTime, alertType } = req.body;
      const alertLogo = req.file.filename; // The filename saved by multer
  
      // Create a new Alert object
      const newAlert = new Alert({
        alertName,
        alertLogo,
        alertDescription,
        alertStartTime,
        alertEndTime,
        alertType,
      });
  
      // Save the new alert to the database
      const savedAlert = await newAlert.save();
  
      res.json(savedAlert); // Send the saved alert as JSON response
    } catch (error) {
      console.error('Error adding alert:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.put('/update/:alertId', authenticateToken, upload.single('alertLogo'), async (req, res) => {
    try {
      const { alertName, alertDescription, alertStartTime, alertEndTime, alertType } = req.body;
      const alertId = req.params.alertId;
  
      // Get the existing alert from the database
      const existingAlert = await Alert.findById(alertId);
      if (!existingAlert) {
        return res.status(404).json({ error: 'Alert not found' });
      }
  
      // Update the alert properties
      existingAlert.alertName = alertName;
      existingAlert.alertDescription = alertDescription;
      existingAlert.alertStartTime = alertStartTime;
      existingAlert.alertEndTime = alertEndTime;
      existingAlert.alertType = alertType;
  
      // Check if a new logo is uploaded and update the logo file name accordingly
      if (req.file) {
        existingAlert.alertLogo = req.file.filename;
      }
  
      // Save the updated alert to the database
      const updatedAlert = await existingAlert.save();
  
      res.json(updatedAlert); // Send the updated alert as JSON response
    } catch (error) {
      console.error('Error updating alert:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
