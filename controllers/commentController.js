const router = require('express').Router();

const service = require('../services/commentService');
const mapErrors = require('../util/mappers');

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
