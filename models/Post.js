const { Schema, model, Types: { ObjectId } } = require('mongoose');

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must be 3 to 80 characters long'],
      maxlength: [60, 'Title must be 3 to 80 characters long'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [2, 'Description must be 2 to 2000 characters long'],
      maxlength: [2000, 'Description must be 2 to 2000 characters long'],
    },
    category: {
      type: String,
      required: true,
      immutable: true,
    },
    author: {
      type: ObjectId,
      ref: 'User',
      required: true,
      immutable: true,
    },
  },
  { timestamps: true }
);

const Post = model('Post', postSchema);

module.exports = Post;
