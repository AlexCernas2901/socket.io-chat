const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const socketConfig = require('./config/socket');
const userSession = require('./config/session');
const bodyParser = require('body-parser');

app.use('/public', express.static('./public'));

app.use(bodyParser.urlencoded({ extended: true }));

// configuración de sesión
app.use(userSession);

app.set('view engine', 'ejs');

// importando rutas dinámicas
const routes = require('./routes');

// rutas dinamicas
app.use('/', routes);

// configuración de Socket.io
socketConfig(io); // Llamada a la función de configuración del socket

const port = process.env.PORT;
server.listen(port, () => console.log(`Servidor iniciado en http://localhost:${port}`));