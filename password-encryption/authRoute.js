const express = require('express');
const router = express.Router();
const user = require('./authController');

router.post('/register', user.register);

module.exports = router;
