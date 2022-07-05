const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

module.exports = (app) => {
  app.use(authController);
  app.use(postController);
};
