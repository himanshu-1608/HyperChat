const express = require('express');
const authControllers = require('../controllers/auth-controllers');

const router = express.Router();

router.post('/user/register', authControllers.registerNewUser);
router.post('/user/login', authControllers.loginUser);

module.exports = router;