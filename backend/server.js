// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// GET endpoints
app.get('/api/healthtips', (req, res) => {
  res.json({
    success: true,
    message: "Here are some mental health tips."
  });
});

app.get('/api/sleepdata', (req, res) => {
  res.json({
    hoursSlept: 7,
    quality: "Good"
  });
});

// POST endpoints
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

// File upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({
    success: true,
    filename: req.file.filename,
    message: 'File uploaded successfully',
  });
});

// PUT endpoints
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
