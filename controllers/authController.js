const router = require('express').Router();

const { register, login } = require('../services/userService');
const mapErrors = require('../util/mappers');
const validateBody = require('../util/validators');

router.post('/register', async (req, res) => {
  try {
    validateBody(req.body);

    const user = await register(
      req.body.username.trim(),
      req.body.email.trim().toLowerCase(),
      req.body.password.trim()
    );
    console.log(user);
    res.status(201).json(user);
  } catch (err) {
    const error = mapErrors(err)
    console.log(error);
    res.status(409).json(error);
  }
});

module.exports = router;
