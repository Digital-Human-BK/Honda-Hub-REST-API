const {Schema, model, Types: {ObjectId}} = require('mongoose');
const emailValidator = require('email-validator');

const NAME_PATTERN = /^[A-Za-z0-9]$/;

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [2, 'Username must be at least 2 characters long'],
    maxlength: [15, 'Username must be '],
    validate: {
      validator(value){
        return NAME_PATTERN.test(value);
      },
      message: 'Username can ony contain latin letters and numbers'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator(value){
        return emailValidator.validate(value);
      },
      message: 'Invalid email!'
    }
  },
  hashedPassword: {
    type: String,
    required: true
  }, 
  myPosts: {
    type: [ObjectId],
    ref: 'Post',
    default: []
  }
});

userSchema.index({email: 1}, {
  unique: true,
  collation: {
    locale: 'en',
    strength: 2
  }
});

const User = model('User', userSchema);

module.exports = User;
