const { Router } = require('express');
const router = Router();
const {
  getIndex,
  getSignup,
  signUp,
  login
} = require('../controllers/indexController');

const { authenticate } = require('../auth/auth');

router.get('/', getIndex);
router.post('/login', login);
router.get('/signup', getSignup);
router.post('/signup', signUp);
router.get('/restricted', authenticate, (req, res) => {
  res.render('restricted');
});

module.exports = router;
