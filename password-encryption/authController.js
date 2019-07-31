const bcrypt = require('bcryptjs');
const User = require('./authModel');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.body;

    User.findOne({ email: email }).then(user => {
      console.log('User exists');
    });
    const user = User({
      name,
      email,
      password
    });
    user.save();
    res.status(201).send('User Registered');
  } catch (err) {
    console.error(err);
  }
};
