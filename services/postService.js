const Post = require('../models/Post');

async function searchPosts(query) {
  return Post.find({ title: { $regex: query, $options: 'i' } })
    .populate('author', 'username')
    .lean();
}

async function getPostsCount(category) {
  return Post.countDocuments({ category });
}

async function getPosts() {
  return Post.find()
    .sort({ createdAt: 1 })
    .populate('author', 'username')
    .lean()
    .limit(20);
}

async function getCategoryPosts(category) {
  return Post.find({ category })
    .sort({ createdAt: -1 })
    .populate('author', 'username')
    .lean();
}

async function getUserPosts(userId) {
  return Post.find({ author: userId },{ title: 1, category: 1, createdAt: 1, author: 1 })
    .populate('author', 'username')
    .sort({ createdAt: -1 })
    .lean();
}

async function getPost(id) {
  return Post.findById(id)
    .populate('author', 'username imageUrl role rank reputation posts cars sign')
    .lean();
}

async function updatePost(id, data) {
  const post = await Post.findById(id);

  post.title = data.title;
  post.text = data.text;
  post.updated = true;

  await post.save();
  return post;
}

async function deletePost(id) {
  await Post.findByIdAndDelete(id);
}

async function createPost(data) {
  const post = new Post(data);
  await post.save();

  return post;
}

async function voteForPost(id, userId, value) {
  const post = await Post.findById(id);

  if (post.voters.includes(userId)) {
    throw new Error('You have already voted');
  }
  post.voters.push(userId);
  post.votes += value;

  await post.save();
  return post;
}

module.exports = {
  searchPosts,
  getPostsCount,
  getPosts,
  getCategoryPosts,
  getUserPosts,
  getPost,
  updatePost,
  deletePost,
  createPost,
  voteForPost,
};
