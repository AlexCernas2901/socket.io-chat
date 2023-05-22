const userSession = require("./session");
const sanitizeHtml = require("sanitize-html");

function configureSocket(io) {
  io.use((socket, next) => {
    userSession(socket.request, socket.request.res, next);
  });

  io.on("connection", (socket) => {
    // evento cuando se recibe un nuevo mensaje del cliente
    socket.on("chatMessage", (message) => {
      // obteniendo datos de la sesión
      const { color, username } = socket.request.session;

      // sanitizando el mensaje
      const sanitizedMessage = sanitizeHtml(message);

      io.emit("chatMessage", {
        message: `[${username}] ${sanitizedMessage}`,
        color,
        username,
      });
    });

    socket.on("disconnect", () => {
      const { username } = socket.request.session;
      console.log(`${username}-left`);
    });
  });
}

module.exports = configureSocket;