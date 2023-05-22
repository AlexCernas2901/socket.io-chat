const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
require("dotenv").config();
const userSession = require("./config/session");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// configuración de sesión
app.use(userSession);

app.set('view engine', 'ejs');

// importando rutas dinámicas
const routes = require('./routes');

// rutas dinamicas
app.use('/', routes);

// configuración de Socket.io
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

const port = process.env.PORT;
server.listen(port, () => console.log(`Servidor iniciado en http://localhost:${port}`));