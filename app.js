const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
require("dotenv").config();
const userSession = require("./config/session");

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de sesión
app.use(userSession);

app.set('view engine', 'ejs');

// importando rutas dinamicas
const routes = require('./routes');

// Rutas
app.use('/', routes);

// configuración de Socket.io
io.use((socket, next) => {
    userSession(socket.request, socket.request.res, next);
});

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');

  // array para mensajes
  const MAX_MESSAGES = 100;
  let messages = [];

  // Evento cuando se recibe un nuevo mensaje del cliente
  socket.on('chatMessage', (message) => {
      // obteniendo datos de la session
      const { color, username } = socket.request.session;

      // agregando el nuevo mensaje al array
      messages.push({ message: `[${username}] ${message}` });

      // eliminando el mensaje más antiguo si se supera el límite
      if (messages.length > MAX_MESSAGES) {
          messages.shift();
      }

      console.log(messages.length - 1, messages)

        // enviando el mensaje a todos los clientes conectados
        io.emit('chatMessage', { message: `[${username}]: ${message}`, color, username });
    });
});

const port = process.env.PORT;
server.listen(port, () => console.log(`Servidor iniciado en http://localhost:${port}`));
