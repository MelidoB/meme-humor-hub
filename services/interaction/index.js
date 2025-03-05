const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3003;

// Endpoint for upvoting a meme
app.post('/upvote', (req, res) => {
  // Add upvote logic here
  res.status(200).json({ message: 'Upvote recorded' });
});

// Endpoint for commenting on a meme
app.post('/comment', (req, res) => {
  // Add commenting logic here
  res.status(200).json({ message: 'Comment recorded' });
});

// Real-time interactions via Socket.io
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Interaction service running on port ${PORT}`);
});
