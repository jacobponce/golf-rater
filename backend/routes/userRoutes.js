const express = require('express');
const userController = require('../authorization/controllers/userController');
const { signup, login } = userController;
const userAuth = require('../common/middlewares/userAuth');

const router = express.Router();

router.post('/signup', userAuth.saveUser, signup)

router.post('/login', login)

module.exports = router;