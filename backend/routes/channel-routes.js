const express = require('express');
const channelControllers = require('../controllers/channel-controllers');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.post('/:cid/join', isAuth, channelControllers.joinChannelByID);
router.get('/:cid/message', channelControllers.getChannelMessages);
router.post('/:cid/message', isAuth, channelControllers.sendMessageInChannel);
router.put('/:cid/message', isAuth, channelControllers.editMessageInChannel);
router.delete('/:cid/message', isAuth, channelControllers.deleteMessageInChannel);
router.post('', isAuth, channelControllers.createNewChannel);
router.get('', channelControllers.getChannels);

module.exports = router;