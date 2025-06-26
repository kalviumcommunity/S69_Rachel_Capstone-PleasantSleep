// models/SleepData.js
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pleasant-sleep', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const sleepDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hours: Number,
  quality: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SleepData', sleepDataSchema);


