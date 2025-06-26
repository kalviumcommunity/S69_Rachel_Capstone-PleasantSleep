const User = require('./models/User');
const SleepData = require('./models/SleepData');

app.post('/api/users/:userId/sleep', async (req, res) => {
  try {
    const sleepData = new SleepData({ ...req.body, user: req.params.userId });
    const savedSleep = await sleepData.save();

    await User.findByIdAndUpdate(req.params.userId, {
      $push: { sleepRecords: savedSleep._id }
    });

    res.status(201).json(savedSleep);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users/:userId/sleep', async (req, res) => {
  try {
    const userWithSleepData = await User.findById(req.params.userId).populate('sleepRecords');
    res.json(userWithSleepData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
