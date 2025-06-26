// models/SleepData.js
const mongoose = require('mongoose');

const sleepDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hours: Number,
  quality: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SleepData', sleepDataSchema);


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pleasant-sleep', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));



require('dotenv').config(); // if using a .env file

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/pleasant-sleep", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ DB connection error:", err));

const express = require('express');
const app = express();
const SleepData = require('./models/SleepData');

app.use(express.json());

app.post('/api/sleepdata', async (req, res) => {
  try {
    const newData = new SleepData(req.body);
    await newData.save();
    res.status(201).json({ success: true, message: "Data saved to DB", data: newData });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving data", error: err });
  }
});

app.get('/api/sleepdata', async (req, res) => {
  try {
    const allData = await SleepData.find();
    res.json({ success: true, data: allData });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error retrieving data", error: err });
  }
});

