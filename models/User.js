const { Schema, model } = require('mongoose');
const emailValidator = require('email-validator');

const USER_REGEX = /^[A-Za-z0-9]+$/;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [2, 'Min username length is 2 characters'],
    maxlength: [16, 'Max username length is 16 characters'],
    validate: {
      validator(value) {
        return USER_REGEX.test(value);
      },
      message: 'Username can ony contain latin letters and numbers',
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    immutable: true,
    validate: {
      validator(value) {
        return emailValidator.validate(value);
      },
      message: 'Invalid email!',
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'User',
  },
  rank: {
    type: String,
    default: 'Fan',
  },
  reputation: {
    type: Number,
    default: 0,
    min: 0,
  },
  posts: {
    type: Number,
    default: 0,
    min: 0,
  },
  drives: {
    type: String,
    default: 'Nothing yet',
    minlength: [1, 'Min length is 1 character'],
    maxlength: [60, 'Max length is 60 characters'],
  },
  sign: {
    type: String,
    default: null,
    minlength: [3, 'Min sign length is 3 characters'],
    maxlength: [200, 'Max sign length is 200 characters'],
  },
  registeredOn: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

userSchema.pre('save', function (next) {
  if (this.posts < 10) {
    this.rank = 'Fan';
  } else if (this.posts < 100) {
    this.rank = 'Enthusiast';
  } else if (this.posts < 1000) {
    this.rank = 'Master';
  } else if (this.posts >= 1000) {
    this.rank = 'Sensei';
  } else {
    this.rank = 'Fan';
  }
  next();
});

userSchema.index(
  { email: 1 },
  {
    unique: true,
    collation: {
      locale: 'en',
      strength: 2,
    },
  }
);

const User = model('User', userSchema);

module.exports = User;
