const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink', 'yellow', 'brown'];
let nextColorIndex = 0;
const usernames = [];

const renderLogin = (req, res) => {
  res.render('login');
}

const loginUser = (req, res) => {
    const { username } = req.body;
    const color = colors[nextColorIndex];
    nextColorIndex = (nextColorIndex + 1) % colors.length;
  
    // verificar si el nombre de usuario ya existe en el array
    if (usernames.includes(username)) {
        req.session.alert = 'El nombre de usuario ya existe';
        return res.redirect('/login');
      }

    // agregar el nombre de usuario al array
    usernames.push(username);
  
    req.session.username = username;
    req.session.color = color;
    res.redirect('/chat');
  }

const logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
}

module.exports = {
  renderLogin,
  loginUser,
  logoutUser,
};