const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/:sessionId', UserController.getUser);

module.exports = router;