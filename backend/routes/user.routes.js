const express = require('express');
const { register, login,logoutUserController } = require('../controllers/user.controllers');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout',logoutUserController)

module.exports = router;
