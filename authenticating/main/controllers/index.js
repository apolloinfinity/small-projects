const bcrypt = require('bcryptjs');

const Users = require('../models/user');
exports.loginPage = async (req, res) => {
  try {
    res.render('login', {
      pageTitle: 'Login'
    });
  } catch (err) {
    console.error(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = await req.body;
    Users.findOne({ email: email }).then(user => {
      if (!user) {
        console.log('That email isnt registered');
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          res.redirect('/user');
        } else {
          res.redirect('/');
        }
      });
    });
  } catch (err) {}
};

exports.registrationPage = async (req, res) => {
  res.render('register', {
    pageTitle: 'Registration'
  });
};
exports.registration = async (req, res) => {
  try {
    const { name, email, password, password2 } = await req.body;

    const checkEmail = await Users.findOne({ email: email });
    if (checkEmail) {
      console.log('That email already exists');
    } else {
      const newUser = Users({
        name,
        email,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save();
        });
      });
    }

    res.status(201).redirect('/');
    console.log(password);
  } catch (err) {
    console.error(err);
  }
};
