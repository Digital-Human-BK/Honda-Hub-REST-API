const router = require('express').Router();

const { register, login } = require('../services/userService');
const mapErrors = require('../util/mappers');
const { validateRegister, validateLogin } = require('../util/validators');

router.post('/register', async (req, res) => {
  try {
    validateRegister(req.body);

    const user = await register(
      req.body.username.trim(),
      req.body.email.trim().toLowerCase(),
      req.body.password.trim()
    );
    console.log(user);
    res.status(201).json(user);
  } catch (err) {
    const error = mapErrors(err);
    if(error[0].msg.includes('username: ')){
      error[0].msg = 'This Username is taken'
    }
    console.log(error);
    res.status(409).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    validateLogin(req.body);

    const user = await login(
      req.body.email.trim().toLowerCase(),
      req.body.password.trim()
    );
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    const error = mapErrors(err);
    console.log(error);
    res.status(409).json(error);
  }
});

module.exports = router;
