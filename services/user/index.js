const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

// Basic endpoint for user registration
app.post('/register', (req, res) => {
  // Ideally, add your registration logic here.
  res.status(201).json({ message: 'User registered successfully' });
});

// Endpoint for user login
app.post('/login', (req, res) => {
  // Add login logic, token generation etc.
  res.status(200).json({ message: 'User logged in successfully' });
});

// Endpoint for fetching user profile
app.get('/profile/:id', (req, res) => {
  // Fetch user profile based on ID.
  res.status(200).json({ userId: req.params.id, name: 'John Doe' });
});

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
