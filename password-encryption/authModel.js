const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  registerDate: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
