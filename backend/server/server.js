require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config'); // Import the config.js file
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.locals.isConnectedToMongoDB = false;

const currentEnvironment = process.env.NODE_ENV || 'development';
const port = config[currentEnvironment].port || 9000;

const mongodbUrl = 'mongodb+srv://abdullahmohammed:Hel5Mb4HkPe4PffC@cluster0.2rsepks.mongodb.net/';

async function connectToMongoDB() {
  try {
    await mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    app.locals.isConnectedToMongoDB = true;
    startServer();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

function startServer() {
  app.use('/alert-logos', express.static(path.join(__dirname, 'alert-logos')));
  const authenticationRoutes = require('./routes/authentication');
  app.use('/auth', authenticationRoutes);

  const userRoutes = require('./routes/user');
  app.use('/user', userRoutes);

  const examRoutes = require('./routes/exam');
  app.use('/exam', examRoutes);

  const alertRoutes = require('./routes/alert');
  app.use('/alert', alertRoutes);

  const instructionRoutes = require('./routes/instruction');
  app.use('/instruction', instructionRoutes);

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}

connectToMongoDB();

module.exports = app; // Export the app object for testing
