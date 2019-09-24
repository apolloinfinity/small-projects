const { compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/keys').TOKEN_SECRET;
const { User, findUser, addUser } = require('../models/User');

exports.getIndex = async (req, res, next) => {
  res.render('login');
};

exports.getSignup = async (req, res, next) => {
  res.render('signup');
};

exports.signUp = async (req, res, next) => {
  const { name, email, password, password2 } = await req.body;
  try {
    const errors = [];
    const user = await findUser(email);

    if (password !== password2) {
      errors.push({ message: `passwords don't match` });
    }
    if (user) {
      errors.push({ message: 'User already exists' });
    }
    if (errors.length > 0) {
      res.status(400).json({ err: errors });
    } else {
      addUser(req.body);
      res.status(201).redirect('/');
    }
  } catch (err) {
    console.error(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await findUser(email);
    const validPass = compare(password, user.password);
    let errors = [];

    if (!email || !password) {
      console.log('Please fill in the blanks');
      res.status(400).render('login');
    }
    if (!user) errors.push({ err: 'User not found' });
    if (!validPass) error.push({ err: 'Wrong password' });
    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        SECRET_KEY,
        {
          expiresIn: '1m'
        }
      );
      res.json({ token });
    }
  } catch (err) {
    console.error(err);
  }
};
