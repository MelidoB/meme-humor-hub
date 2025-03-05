const express = require('express');
const multer  = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

const PORT = process.env.PORT || 3002;

// Endpoint to upload memes
app.post('/upload', upload.single('meme'), (req, res) => {
  res.status(201).json({ message: 'Meme uploaded successfully', file: req.file });
});

// Endpoint to fetch memes (this can be expanded with database integration)
app.get('/memes', (req, res) => {
  res.status(200).json({ memes: [] });
});

app.listen(PORT, () => {
  console.log(`Content service running on port ${PORT}`);
});
