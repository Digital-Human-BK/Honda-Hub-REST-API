const {Schema, model, Types: {ObjectId}} = require('mongoose');
const emailValidator = require('email-validator');

const USER_REGEX = /^[A-Za-z0-9]+$/;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [2, 'Username too short'],
    maxlength: [15, 'Username too long'],
    validate: {
      validator(value){
        return USER_REGEX.test(value);
      },
      message: 'Username can ony contain latin letters and numbers'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    immutable: true,
    validate: {
      validator(value){
        return emailValidator.validate(value);
      },
      message: 'Invalid email!'
    }
  },
  password: {
    type: String,
    required: true
  }, 
  registeredOn: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  }
  // myPosts: {
  //   type: [ObjectId],
  //   ref: 'Post',
  //   default: []
  // }
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
