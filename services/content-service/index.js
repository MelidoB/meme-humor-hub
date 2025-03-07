const express = require('express');
const multer = require('multer');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configure SQLite Database
const db = new sqlite3.Database('database.db', (err) => {
  if (err) console.error('Database connection failed:', err);
  else console.log('Connected to SQLite database');
});

// Create memes table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS memes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    imageUrl TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

const PORT = process.env.PORT || 3002;

// Upload Meme Endpoint
app.post('/upload', upload.single('meme'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { filename } = req.file;
  const imageUrl = `/uploads/${filename}`;

  db.run(
    'INSERT INTO memes (title, imageUrl) VALUES (?, ?)',
    [filename, imageUrl],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Database insert failed' });
      }
      res.status(201).json({ message: 'Meme uploaded successfully', id: this.lastID });
    }
  );
});

// Fetch All Memes Endpoint
app.get('/memes', (req, res) => {
  db.all('SELECT * FROM memes ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch memes' });
    }
    res.status(200).json({ memes: rows });
  });
});

// Serve Uploaded Files
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`Content service running on port ${PORT}`);
});
