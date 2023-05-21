const renderChat = (req, res) => {
    if (!req.session.username) {
      res.redirect('/login');
    } else {
      res.render('chat', { username: req.session.username, color: req.session.color });
    }
  }
  
  module.exports = {
    renderChat,
  };