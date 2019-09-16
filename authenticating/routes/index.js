const { Router } = require('express');
const authenticate = require('../auth/auth');

const router = Router();
const userController = require('../controllers/index');
const restrictedContent = require('../controllers/restricted');

router.get('/', (req, res) => res.render('login'));
router.post('/login', userController.login);

router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', userController.signup);

router.get('/restricted', authenticate, restrictedContent.restricted);

module.exports = router;
