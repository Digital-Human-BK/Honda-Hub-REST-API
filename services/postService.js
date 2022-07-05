const Post = require('../models/Post');

async function getPostsCount(category) {
  return Post.countDocuments({ category });
}

async function getPosts(category) {
  return Post.find({ category }).sort({ createdAt: 1 }).lean();
}

async function getPost(id) {
  return Post.findById(id)
          .populate('author', 'username')
          .lean();
}

async function updatePost(id, data) {
  const post = await Post.findById(id);

  post.title = data.title;
  post.description = data.description;

  await post.save();
  return post;
}

async function createPost(data) {
  const post = new Post(data);
  await post.save();

  return post;
}

async function deletePost(id) {
  await Post.findByIdAndDelete(id);
}

module.exports = {
  getPostsCount,
  getPosts,
  getPost,
  updatePost,
  createPost,
  deletePost,
};
