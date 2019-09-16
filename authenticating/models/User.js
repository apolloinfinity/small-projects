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

module.exports = User = model('user', UserSchema);

module.exports.getUserByEmail = async email => {
  const query = await email;

  return await User.findOne({ email: query });
};

module.exports.addUser = async userData => {
  try {
    const newUser = new User(userData);
    console.log(userData);
    const passwordHash = await hash(newUser.password, 10);
    newUser.password = passwordHash;
    console.log(`${newUser.password}`);
    return await newUser.save();
  } catch (err) {
    throw err;
  }
};
