const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

module.exports = (app) => {
  app.use(authController);
  app.use(postController);
  app.use(commentController);
};
