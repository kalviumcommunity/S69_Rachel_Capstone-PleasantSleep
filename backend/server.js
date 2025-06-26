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

app.use(express.json());

app.post('/api/sleepdata', (req, res) => {
  const { hours, quality } = req.body;

  if (!hours || !quality) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  res.status(201).json({
    success: true,
    message: 'Sleep data saved',
    data: { hours, quality }
  });
});

app.post('/api/feedback', (req, res) => {
  const { feedback } = req.body;

  if (!feedback) {
    return res.status(400).json({ success: false, message: 'Feedback is required' });
  }

  res.status(201).json({
    success: true,
    message: 'Feedback received',
    data: { feedback }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use(express.json()); 

// Sample PUT endpoint for updating user data
app.put('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  // Logic to update user in database would go here

  res.json({
    success: true,
    message: `User with ID ${userId} updated successfully.`,
    data: updatedData
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
