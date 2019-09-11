const { Bearer } = require('permit');
const { compare } = require('bcrypt');
const User = require('../models/User');

const permit = new Bearer({
  basic: 'email',
  query: 'access_token' // this won't have an access token
});

module.exports.authenticate = async (req, res, next) => {
  const token = permit.check(req);
  try {
    if (!token) {
      permit.fail(res);
      return next(new Error('Authentication required!'));
    }
    //   1. Find if email exists
    const user = await User.getUserByEmail(req.email);
    // 2. compare password and stored hash
    const pwHash = user.password;
    const isMatch = compare(password, pwHash);
    if (!isMatch) {
      permit.fail(res);
      res.redirect('/login');
      return next(new Error(`Password doesn't match`));
    }

    if (!user) {
      permit.fail(res);
      res.redirect('/login');
      return next(new Error('Authentication failed'));
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
  }
};
