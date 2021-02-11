const express = require('express');
const userControllers = require('../controllers/user-controllers');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.put('/:uid/dm/add', isAuth, userControllers.addNewDM);
router.get('/:uid', isAuth, userControllers.getUserDetails);
router.get('/:uid/dm/:dmid/message', isAuth, userControllers.getUserDmMessages);
router.post('/:uid/dm/message', isAuth, userControllers.sendMessageInDM);
router.put('/:uid/dm/message', isAuth, userControllers.editMessageInDM);
router.delete('/:uid/dm/message', isAuth, userControllers.deleteMessageInDM);
router.get('', userControllers.getAllUsers);
module.exports = router;