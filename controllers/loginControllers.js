const sanitizeHtml = require('sanitize-html');
const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink', 'yellow', 'brown'];
let nextColorIndex = 0;
const usernames = [];

const renderLogin = (req, res) => {
  const alert = req.session.alert;
  res.render('login', { alert });
}

const loginUser = (req, res) => {
  let { username } = req.body;
  username = sanitizeHtml(username); // sanitizando el nombre de usuario

  // verificando si el nombre de usuario ya existe en el array
  if (usernames.includes(username)) {
    req.session.alert = 'El usuario ya está logueado';
    return res.redirect('/login');
  }

  // agregando el nombre de usuario al array
  usernames.push(username);
  const color = colors[nextColorIndex];
  nextColorIndex = (nextColorIndex + 1) % colors.length;
  console.log(`${username}-joined`);
  console.log(`Actual users: ${usernames}`);

  req.session.username = username;
  req.session.color = color;
  res.redirect('/chat');
}

const logoutUser = (req, res) => {
  const { username } = req.session;
  const sanitizedUsername = sanitizeHtml(username); // sanitizando el nombre de usuario

  // eliminando el nombre de usuario del array
  const index = usernames.indexOf(sanitizedUsername);
  if (index !== -1) {
    usernames.splice(index, 1);
  }
  console.log(usernames);

  req.session.destroy();
  res.redirect('/login');
};

module.exports = {
  renderLogin,
  loginUser,
  logoutUser,
};