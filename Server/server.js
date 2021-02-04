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

  // Brodcast when a new user connects
  socket.broadcast.emit('message', 'A user has joined the chat');

  // Brodcast when a user disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });

  //Catch chat message and brodcast
  socket.on('chat', ({ name, message }) => {
    io.emit('message', { name, message });
  });
});

http.listen(4000, () => {
  console.log('listening on port 4000');
});
