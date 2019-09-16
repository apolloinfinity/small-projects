const { hash, compare } = require('bcrypt');
const User = require('../models/User');

exports.signup = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  try {
    let errors = [];

    if (!name | !email | !password | !password2) {
      errors.push({ msg: 'Missing information' });
    }
    if (password != password2) {
      errors.push('Passwords do not match!');
    }

    if (errors.length > 0) {
      console.log(errors);
      res.render('signup');
    } else {
      const user = await User.getUserByEmail(email);
      if (user) {
        errors.push({ msg: 'That email already exists!' });
        console.log(errors);
        res.render('signup');
      } else {
        await User.addUser(req.body);
        res.redirect('/');
      }
    }

    res.status(201).json();
  } catch (err) {
    console.error(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = await req.body;
    const user = await User.getUserByEmail(email);

    if (user !== null && compare(password, user.password)) {
      console.log(`User exists`);
    } else {
      console.log('User does not exists');
    }
    // next();
  } catch (err) {
    console.error(err);
  }
};
