const userSession = require("./session");

function configureSocket(io) {
  io.use((socket, next) => {
    userSession(socket.request, socket.request.res, next);
  });

  io.on('connection', (socket) => {
    // evento cuando se recibe un nuevo mensaje del cliente
    socket.on('chatMessage', (message) => {
      // obteniendo datos de la sesión
      const { color, username } = socket.request.session;

      io.emit('chatMessage', { message: `[${username}] ${message}`, color, username });
    });

    socket.on('disconnect', () => {
      const { username } = socket.request.session;
      console.log(`${username}-left`);
    });
  });
}

module.exports = configureSocket;