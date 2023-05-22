const session = require('express-session');
require("dotenv").config();

const userSession = session({
  secret: process.env.secret_SESSION,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000 // duración de la sesión en milisegundos
  }
});

module.exports = userSession;