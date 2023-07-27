require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 9000;

const mongodbUrl = 'mongodb+srv://abdullahmohammed:Hel5Mb4HkPe4PffC@cluster0.2rsepks.mongodb.net/';
mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const authenticationRoutes = require('./routes/authentication');

app.use('/auth', authenticationRoutes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
