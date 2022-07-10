const { Schema, model, Types: { ObjectId } } = require('mongoose');

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must be 3 to 80 characters long'],
      maxlength: [80, 'Title must be 3 to 80 characters long'],
    },
    text: {
      type: String,
      required: [true, 'Content required'],
      minlength: [2, 'Content must be 2 to 2000 characters long'],
      maxlength: [2000, 'Content must be 2 to 2000 characters long'],
    },
    category: {
      type: String,
      enum: {
        values: ['general', 'problems', 'events'],
        message: 'Invalid category'
      },
      required: true,
      immutable: true,
    },
    author: {
      type: ObjectId,
      ref: 'User',
      required: true,
      immutable: true,
    },
    likes: {
      type: [String],
      default: []
    },
  },
  { timestamps: true }
);

const Post = model('Post', postSchema);

module.exports = Post;
