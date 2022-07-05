const emailValidator = require('email-validator');
const USER_REGEX = /^[A-Za-z0-9]+$/;
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
    errors.push({ msg: 'Username must be only latin letters and numbers' });
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

module.exports = {
  validateRegister,
  validateLogin,
};
