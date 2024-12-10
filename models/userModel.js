const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    required: [true, 'User must have a password confirmation.'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same.'
    }
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;