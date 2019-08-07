const express = require('express');

const router = express.Router();

const index = require('../controllers/index');
const user = require('../controllers/user');

// Public Routes
router.get('/', index.loginPage);
router.post('/login', index.login);

router.get('/register', index.registrationPage);
router.post('/register', index.registration);

// Priviledged Routes
router.get('/user', user.dashboard);

module.exports = router;
