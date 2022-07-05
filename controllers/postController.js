const router = require('express').Router();

const service = require('../services/postService');
const mapErrors = require('../util/mappers');

router.get('/posts-count', async (req, res) => {
  try {
    const [offtopic, common] = await Promise.all([
      service.getPostsCount('offtopic'),
      service.getPostsCount('common'),
    ]);
    res.status(200).json({offtopic, common});
  } catch (err) {
    const error = mapErrors(err);
    console.log(error);
    res.status(404).json(error);
  }
});

router.get('/posts', async (req, res) => {
  try {
    const posts = await service.getPosts(req.query.category);
    res.status(200).json(posts);
  } catch (err) {
    const error = mapErrors(err);
    console.log(error);
    res.status(404).json(error);
  }
});

router.post('/posts', async (req, res) => {
  const title = req.body.title.trim();
  const description = req.body.description.trim();
  const category = req.body.category.trim();
  const author = req.body.author.trim();

  try {
    const post = await service.createPost({
      title,
      description,
      category,
      author,
    });

    res.status(201).json(post);
  } catch (err) {
    const error = mapErrors(err);
    console.log(error);
    res.status(409).json(error);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const post = await service.getPost(req.params.id);
    if (post === null) {
      throw new Error('Page not found');
    }
    res.status(200).json(post);
  } catch (err) {
    const error = mapErrors(err);
    console.log(error);
    res.status(404).json(error);
  }
});

router.put('/posts/:id', async (req, res) => {
  const title = req.body.title.trim();
  const description = req.body.description.trim();
  try {
    const post = await service.updatePost(req.params.id, {
      title,
      description,
    });
    res.status(200).json(post);
  } catch (err) {
    const error = mapErrors(err);
    console.log(error);
    res.status(404).json(error);
  }
});

router.delete('/posts/:id', async (req, res) => {
  try {
    await service.deletePost(req.params.id);
    res.status(204).end();
  } catch (err) {
    const error = mapErrors(err);
    console.log(error);
    res.status(404).json(error);
  }
});

module.exports = router;
