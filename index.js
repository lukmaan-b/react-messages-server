const PORT = process.env.PORT || 5000;
const io = require('socket.io')(PORT);

io.on('connection', (socket) => {
  const id = socket.handshake.query.userId;
  socket.join(id);
  socket.on('send-message', (data) => {
    for (const r of data.recipents) {
      socket.broadcast.to(r).emit('message-recieve', data);
    }
  });
});
