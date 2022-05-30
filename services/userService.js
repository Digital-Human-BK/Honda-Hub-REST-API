const { hash, compare } = require('bcrypt');
const User = require('../models/User');

async function register(username, email, password) {
  const existing = await getUserByEmail(email);

  if (existing) {
    throw new Error('User already exist');
  }

  const hashedPassword = await hash(password, 10);

  const user = {
    username,
    email,
    hashedPassword,
  };

  try {
    await user.save();
    return user;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function login(email, password) {
  const user = await getUserByEmail(email);

  if (user === null) {
    console.log("User doesn't exist");
    throw new Error('Incorrect email or password');
  }

  const hasMatch = await compare(password, user.hashedPassword);
  if (hasMatch === false) {
    console.log("Passwords don't match");
    throw new Error('Incorrect email or password');
  }

  return user;
}

async function getUserByEmail(email) {
  return User.findOne({ email });
}

module.exports = {
  register,
  login
};