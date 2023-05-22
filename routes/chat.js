const express = require('express');
const router = express.Router();
const { renderChat }= require('../controllers/chatControllers');

router.get('/', renderChat);

module.exports = router;