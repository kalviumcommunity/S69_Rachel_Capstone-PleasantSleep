// Example: server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Sample GET endpoint
app.get('/api/healthtips', (req, res) => {
  res.json({
    success: true,
    message: "Here are some mental health tips."
  });
});

// Another example GET
app.get('/api/sleepdata', (req, res) => {
  res.json({
    hoursSlept: 7,
    quality: "Good"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
