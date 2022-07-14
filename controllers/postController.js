const router = require('express').Router();

const service = require('../services/postService');
const { incrementUserPosts } = require('../services/userService');
const mapErrors = require('../util/mappers');

router.get('/posts-count', async (req, res) => {
  try {
    const [general, problems, events] = await Promise.all([
      service.getPostsCount('general'),
      service.getPostsCount('problems'),
      service.getPostsCount('events'),
    ]);
    res.status(200).json({ general, problems, events });
  } catch (err) {
    const error = mapErrors(err);
    console.log(error);
    res.status(404).json(error);
  }
});

router.get('/search', async (req, res) => {
  try {
    const posts = await service.searchPosts(req.query.term);
    res.status(200).json(posts);
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

router.get('/categories/:category', async (req, res) => {
  try {
    const posts = await service.getCategoryPosts(req.params.category);
    res.status(200).json(posts);
  } catch (err) {
    const error = mapErrors(err);
    console.log(error);
    res.status(404).json(error);
  }
});

router.post('/posts', async (req, res) => {
  const title = req.body.title.trim();
  const text = req.body.text.trim();
  const category = req.body.category.trim();
  const author = req.body.author;

  try {
    
    const post = await service.createPost({
      title,
      text,
      category,
      author,
    });
    await incrementUserPosts(author);

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
  const text = req.body.text.trim();
  try {
    const post = await service.updatePost(req.params.id, {
      title,
      text,
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
