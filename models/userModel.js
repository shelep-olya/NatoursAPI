const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name.']
  },
  email: {
    type: String,
    required: [true, 'User must have an email.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'User must have a valid email.']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'User must have a password.'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'User must have a password confirmation.']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
