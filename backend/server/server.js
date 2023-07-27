const express = require('express');
const app = express();
const port = 3000;

// Route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, this is a server!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
