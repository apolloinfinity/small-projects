const { Basic } = require('permit');
const { compare } = require('bcrypt');
const User = require('../models/User');

const permit = new Basic();

authenticate = async (req, res, next) => {
  try {
    const credentials = await permit.check(req);
    if (!credentials) {
      permit.fail(res);
      return next();
    }
    //   1. Find if email exists
    const user = await User.getUserByEmail(req.email);
    // 2. compare password and stored hash
    const pwHash = user.password;
    const isMatch = compare(password, pwHash);

    if (!user) {
      permit.fail(res);
      res.redirect('/login');
      // return next(new Error('Authentication failed'));
    }

    if (!isMatch) {
      permit.fail(res);
      res.redirect('/login');
      return next();
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports = authenticate;
