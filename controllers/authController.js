const router = require('express').Router();

const mapErrors = require('../util/mappers');
const { validateRegister, validateLogin, validateUserInfo } = require('../util/validators');
const { register, login, updateUserInfo } = require('../services/userService');

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
      error[0].msg = 'Username already taken'
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

router.put('/update-user/:userId', async (req, res) => {
  try {
    validateUserInfo(req.body);
    const updatedData = await updateUserInfo(req.params.userId, {
      cars: req.body.cars.trim(),
      sign: req.body.sign.trim(),
      about: req.body.about.trim(),
    });
    res.status(200).json(updatedData);
  } catch (err) {
    const error = mapErrors(err);
    if(error[0].msg.includes('username: ')){
      error[0].msg = 'Username already taken'
    }
    console.log(error);
    res.status(404).json(error);
  }
})

module.exports = router;
