const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatControllers');

router.get('/', chatController.renderChat);

module.exports = router;