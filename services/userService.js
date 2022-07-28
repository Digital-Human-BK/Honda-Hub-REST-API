const { hash, compare } = require('bcrypt');
const User = require('../models/User');

async function register(username, email, password) {
  const existing = await getUserByEmail(email);

  if (existing) {
    throw new Error('User already exist');
  }

  const hashedPassword = await hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    registeredOn: user.registeredOn,
  };
}

async function login(email, password) {
  const user = await getUserByEmail(email);

  if (user === null) {
    console.log("User doesn't exist");
    throw new Error('Incorrect email or password');
  }

  const hasMatch = await compare(password, user.password);
  if (hasMatch === false) {
    console.log("Passwords don't match");
    throw new Error('Incorrect email or password');
  }

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    registeredOn: user.registeredOn,
  };
}

async function getUserByEmail(email) {
  return User.findOne({ email });
}

async function getUserInfo(userId) {
  const user = await User.findById(
    { _id: userId },
    { password: 0, email: 0 }
  ).lean();
  return user;
}

async function incrementUserPosts(userId) {
  const user = await User.findById(userId);

  user.posts += 1;
  await user.save();
}

async function updateUserReputation(userId, value) {
  const user = await User.findById(userId);
  if (user.reputation + value >= 0) {
    user.reputation += value;
    await user.save();
  }
}

async function updateUserInfo(userId, data) {
  const user = await User.findById(userId);

  user.cars = data.cars;
  user.sign = data.sign;
  user.about = data.about;

  await user.save();

  return {
    cars: user.cars,
    sign: user.sign,
    about: user.about
  };
}

module.exports = {
  register,
  login,
  getUserInfo,
  incrementUserPosts,
  updateUserReputation,
  updateUserInfo
};
