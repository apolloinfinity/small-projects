const express = require('express');

const router = express.Router();

const index = require('Controllers/index');
const user = require('Controllers/user').loginPage;

// Public Routes
router.get('/', user);

// Priviledged Routes
router.get('/dashboard', index.dashboard);

module.exports = router;
