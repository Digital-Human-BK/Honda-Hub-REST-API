const { Schema, model } = require('mongoose');
const emailValidator = require('email-validator');

const USER_REGEX = /^\w+$/;

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
  imageUrl: {
    type: String,
    default:
      'https://res.cloudinary.com/dio4dx3uy/image/upload/v1659378780/honda-hub/default-avatar_awawdx.jpg',
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
  cars: {
    type: String,
    default: '',
  },
  sign: {
    type: String,
    default: '',
  },
  about: {
    type: String,
    default: '',
  },
  registeredOn: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

userSchema.pre('save', function (next) {
  if (this.posts < 5) {
    this.rank = 'Fan';
  } else if (this.posts < 10) {
    this.rank = 'Enthusiast';
  } else if (this.posts < 20) {
    this.rank = 'Master';
  } else if (this.posts >= 100) {
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

userSchema.index(
  { username: 1 },
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
