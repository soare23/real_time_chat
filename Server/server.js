const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  // Welcome new user
  socket.emit('message', 'Welcome to chat');

  // Brodcast when a user disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'An user has left the chat');
  });

  //Catch chat message and brodcast
  socket.on('chat', ({ username, message }) => {
    // io.emit('message', { username, message });
    console.log(username + ' ' + message);
  });

  // Listen for new user and brodcast when he connects
  socket.on('new user', (username) => {
    console.log('the username from the server ' + username);
    socket.broadcast.emit('message', username + ' has joined the chat');
  });
});

http.listen(4000, () => {
  console.log('listening on port 4000');
});
