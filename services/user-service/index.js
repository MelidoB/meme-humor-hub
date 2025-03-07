const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

// Set up SQLite database file in the current directory
const dbPath = path.resolve(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
    // Create the 'users' table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error("Error creating users table:", err.message);
        } else {
          console.log("Users table ready.");
        }
      }
    );
  }
});

// Endpoint for user registration
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email, and password.' });
  }
  const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  db.run(sql, [name, email, password], function (err) {
    if (err) {
      console.error("Error inserting user:", err.message);
      return res.status(500).json({ message: 'Error registering user', error: err.message });
    }
    res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
  });
});

// Endpoint for user login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password.' });
  }
  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.get(sql, [email, password], (err, row) => {
    if (err) {
      console.error("Error querying user:", err.message);
      return res.status(500).json({ message: 'Error logging in', error: err.message });
    }
    if (!row) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'User logged in successfully', user: row });
  });
});

// Endpoint for fetching user profile
app.get('/profile/:id', (req, res) => {
  const sql = `SELECT id, name, email FROM users WHERE id = ?`;
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      console.error("Error fetching profile:", err.message);
      return res.status(500).json({ message: 'Error fetching profile', error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user: row });
  });
});

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
