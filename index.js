const PORT = process.env.PORT || 5000;
const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  const id = socket.handshake.query.userId;
  socket.join(id);
  socket.on('send-message', (data) => {
    for (const r of data.recipients) {
      socket.broadcast.to(r).emit('message-recieve', data);
    }
  });
});

httpServer.listen(PORT);
