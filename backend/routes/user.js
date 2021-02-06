
const express = require('express');
const userControllers = require('../controllers/user');

const router = express.Router();

router.post('/registerNewUser', userControllers.registerNewUser);

router.post('/loginUser', userControllers.loginUser);

router.get('/getAllUsers', userControllers.getAllUsers);

router.patch('/addNewFriend', userControllers.addNewFriend);

router.get('/getUserFriendsAndChannels', userControllers.getUserFriendsAndChannels);

router.get('/getAllUserNames', userControllers.getAllUserNames);

module.exports = router;