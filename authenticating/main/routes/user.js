const express = require('express');

const router = express.Router();

const user = require('Controllers/user');

router.post('/login', user.login);

router.get('/register', user.registrationPage);
router.post('/register', user.registration);

module.exports = router;
