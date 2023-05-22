const { check, validationResult } = require("express-validator");

const loginValidator = [
    check('username')
      .isLength({ min: 4, max: 20 })
      .withMessage('Ingresa un usuario de entre 4 y 20 caracteres'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const alert = errors.array()[0].msg;
        req.session.alert = alert; 
        return res.redirect('/login');
      }
      next();
    },
  ];

module.exports = { loginValidator };
