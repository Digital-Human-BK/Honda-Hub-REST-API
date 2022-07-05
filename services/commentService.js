const Comment = require('../models/Comment');

async function getComments(postId) {
  return Comment.find({ postId }).populate('author').lean();
}

async function getComment(id) {
  return Comment.find({ id }).lean();
}

async function createComment(data) {
  const comment = new Comment(data);
  await comment.save();

  return comment;
}

async function updateComment(id, data) {
  const comment = await Comment.findById(id);

  comment.text = data.text;
  await comment.save();
  return comment;
}

async function deleteComment(id) {
  await Comment.findByIdAndDelete(id);
}

module.exports = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
