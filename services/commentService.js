const Comment = require('../models/Comment');

async function getComments(postId) {
  return Comment.find({ postId })
    .populate('author', 'username role rank reputation posts cars sign')
    .lean();
}

async function deleteComments(postId) {
  return Comment.deleteMany({ postId });
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
  comment.updated = true;
  
  await comment.save();
  return comment;
}

async function deleteComment(id) {
  await Comment.findByIdAndDelete(id);
}

async function voteForComment(id, userId, value){
  const comment = await Comment.findById(id);


  if(comment.voters.includes(userId)){
    throw new Error('You have already voted');
  }
  comment.voters.push(userId);
  comment.votes += value;

  await comment.save();
  return comment;
};

module.exports = {
  getComments,
  deleteComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
  voteForComment
};
