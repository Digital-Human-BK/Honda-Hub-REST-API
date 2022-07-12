const router = require('express').Router();

const service = require('../services/commentService');
const mapErrors = require('../util/mappers');

router.get('/post-comments/:postId', async (req, res) => {
  try {
    const comments = await service.getComments(req.params.postId);
    res.status(200).json(comments);
  } catch (err) {
    const error = mapErrors(err);
    console.log(error);
    res.status(404).json(error);
  }
});

router.post('/comments', async (req, res) => {
  const text = req.body.text.trim();
  const postId = req.body.postId;
  const author = req.body.author;

  try {
    const comment = await service.createComment({
      text,
      postId,
      author,
    });

    res.status(201).json(comment);
  } catch (err) {
    const error = mapErrors(err);
    console.log(error);
    res.status(409).json(error);
  }
});

router.get('/comments/:id', async (req, res) => {
  try {
    const comment = await service.getComment(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    const error = mapErrors(err);
    console.log(error);
    res.status(404).json(error);
  }
});

router.put('/comments/:id', async (req, res) => {
  const text = req.body.text.trim();

  try {
    const comment = await service.updateComment(req.params.id, { text });
    res.status(200).json(comment);
  } catch (err) {
    const error = mapErrors(err);
    console.log(error);
    res.status(404).json(error);
  }
});

router.delete('/comments/:id', async (req, res) => {
  try {
    await service.deleteComment(req.params.id);
    res.status(204).end();
  } catch (err) {
    const error = mapErrors(err);
    console.log(error);
    res.status(404).json(error);
  }
});

module.exports = router;
