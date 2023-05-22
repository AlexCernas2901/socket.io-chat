const express = require('express');
const router = express.Router();
const { renderLogin, loginUser } = require('../controllers/loginControllers');
const { loginValidator } = require("../validators/loginValidator");

router.get('/', renderLogin);
router.post('/', loginValidator, loginUser);

module.exports = router;