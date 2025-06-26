const jwt = require('jsonwebtoken');

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Validate user here (DB check)
  const user = { username }; // Simplified user object

  const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ accessToken });
});

const authenticateToken = require('./middleware/auth');

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});
