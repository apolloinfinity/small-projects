const express = require('express');

const router = express.Router();

const index = require('Controllers/index');
const user = require('Controllers/user');

// Public Routes
router.get('/', index.loginPage);
router.post('/login', index.login);

router.get('/register', index.registrationPage);
router.post('/register', index.registration);

// Priviledged Routes
router.get('/user', user.dashboard);
router.get('/user/logout', user.logout);

module.exports = router;
