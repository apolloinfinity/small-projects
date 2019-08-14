const express = require('express');

const router = express.Router();

const index = require('Controllers/index');
const user = require('Controllers/user');

// Public Routes
router.get('/', user.loginPage);

// Priviledged Routes
router.get('/dashboard', index.dashboard);

module.exports = router;
