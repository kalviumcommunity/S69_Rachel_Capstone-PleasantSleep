const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const User = require('./models/User');
const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/pleasant-sleep', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Register Route
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Registration failed", error: err.message });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(401).json({ success: false, message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid password' });

  const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

  res.json({ success: true, token });
});

// Session setup
app.use(session({ secret: 'secret123', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Configure Google Strategy
passport.use(new GoogleStrategy({
  clientID: 'GOOGLE_CLIENT_ID',
  clientSecret: 'GOOGLE_CLIENT_SECRET',
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.send('Login successful with Google! User: ' + JSON.stringify(req.user));
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
