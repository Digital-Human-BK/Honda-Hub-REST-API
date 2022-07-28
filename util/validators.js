const emailValidator = require('email-validator');
const USER_REGEX = /^\w+$/;
const PWD_REGEX = /^[A-Za-z0-9]{5,20}$/;

function validateRegister(body) {
  const username = body.username.trim();
  const email = body.email.trim();
  const password = body.password.trim();

  const errors = [];

  if (username === '') {
    errors.push({ msg: 'Username is required' });
  }
  if (USER_REGEX.test(username) === false && username !== '') {
    errors.push({
      msg: 'Username must be only latin letters and numbers. No spaces allowed',
    });
  }
  if (username.length > 0 && username.length < 2) {
    errors.push({ msg: 'Username must be longer than 2 characters' });
  }
  if (username.length > 15) {
    errors.push({ msg: 'Username must be shorter than 15 characters' });
  }
  if (email === '') {
    errors.push({ msg: 'Email is required' });
  }
  if (emailValidator.validate(email) === false && email !== '') {
    errors.push({ msg: 'Invalid email' });
  }
  if (password === '') {
    errors.push({ msg: 'Password required' });
  }
  if (PWD_REGEX.test(password) === false && password !== '') {
    errors.push({
      msg: 'Password must be 5 to 20 characters, latin letters and numbers only',
    });
  }

  if (errors.length > 0) {
    throw errors;
  }
}

function validateLogin(body) {
  const email = body.email.trim();
  const password = body.password.trim();

  const errors = [];

  if (email === '') {
    errors.push({ msg: 'Email is required' });
  }
  if (emailValidator.validate(email) === false && email !== '') {
    errors.push({ msg: 'Invalid email' });
  }
  if (password === '') {
    errors.push({ msg: 'Password is required' });
  }
  if (PWD_REGEX.test(password) === false && password !== '') {
    errors.push({ msg: 'Invalid password' });
  }

  if (errors.length > 0) {
    throw errors;
  }
}

function validateUserInfo(body) {
  const cars = body.cars.trim();
  const sign = body.sign.trim();
  const about = body.about.trim();

  const errors = [];

  if (cars.length > 60) {
    errors.push({ msg: 'Cars length must be 1 to 60 characters long' });
  }
  if (sign.length > 0 && sign.length < 3) {
    errors.push({ msg: 'Sign length must be 3 to 200 characters long' });
  }
  if (sign.length > 200) {
    errors.push({ msg: 'Sign length must be 3 to 200 characters long' });
  }
  if (about.length > 0 && about.length < 5) {
    errors.push({ msg: 'About length must be 5 to 1000 characters long' });
  }
  if (about.length > 1000) {
    errors.push({ msg: 'About length must be 5 to 1000 characters long' });
  }

  if (errors.length > 0) {
    throw errors;
  }
}

module.exports = {
  validateRegister,
  validateLogin,
  validateUserInfo,
};
