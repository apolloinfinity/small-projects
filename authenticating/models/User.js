const { model, Schema } = require('mongoose');
const { hash, compare } = require('bcrypt');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = model('users', UserSchema);

module.exports.findUser = async email => {
  return await User.findOne({ email: email });
};

module.exports.addUser = async userData => {
  try {
    const newUser = User(userData);
    const passwordHash = await hash(newUser.password, 10);
    newUser.password = passwordHash;
    return await newUser.save();
  } catch (err) {
    throw err;
  }
};
