
const express = require('express');
const channelControllers = require('../controllers/channel');

const router = express.Router();

router.post('/createNewChannel', channelControllers.createNewChannel);

router.post('/joinChannelByID', channelControllers.joinChannelByID);

router.get('/getAllChannels', channelControllers.getAllChannels);


module.exports = router;