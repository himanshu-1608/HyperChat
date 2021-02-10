
const express = require('express');
const messageControllers = require('../controllers/message');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.get('/getMessages/:id', isAuth, messageControllers.getMessages);

router.post('/sendMessage', isAuth, messageControllers.sendMessage);

router.patch('/editMessage', messageControllers.editMessage);

router.delete('/deleteMessage', messageControllers.deleteMessage);

module.exports = router;