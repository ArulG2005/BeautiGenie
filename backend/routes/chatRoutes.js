const express = require('express');
const ChatController = require('../controllers/chatController');

const router = express.Router();

router.post('/', ChatController.handleChat);

module.exports = router;