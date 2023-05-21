const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink', 'yellow', 'brown'];
let nextColorIndex = 0;
const usernames = [];

const renderLogin = (req, res) => {
  const alert = req.session.alert;
  res.render('login', { alert });
}

const loginUser = (req, res) => {
    const { username } = req.body;
  
    // verificar si el nombre de usuario ya existe en el array
    if (usernames.includes(username)) {
        req.session.alert = 'El usuario ya esta logueado';
        return res.redirect('/login');
      }
    // agregar el nombre de usuario al array
    usernames.push(username);
    const color = colors[nextColorIndex];
    nextColorIndex = (nextColorIndex + 1) % colors.length;
    console.log(usernames);   
      
    req.session.username = username;
    req.session.color = color;
    res.redirect('/chat');
  }

  const logoutUser = (req, res) => {
    const { username } = req.session;
    
    // Eliminar el nombre de usuario del array
    const index = usernames.indexOf(username);
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