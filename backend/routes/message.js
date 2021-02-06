
const express = require('express');
const messageControllers = require('../controllers/message');

const router = express.Router();

router.post('/sendMessage', messageControllers.sendMessage);

router.patch('/editMessage', messageControllers.editMessage);

router.delete('/deleteMessage', messageControllers.deleteMessage);

module.exports = router;