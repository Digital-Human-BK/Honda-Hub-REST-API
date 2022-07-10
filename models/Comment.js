const { Schema, model, Types: { ObjectId } } = require('mongoose');

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'Can\'t post empty comment'],
      minlength: [2, 'Comment must be 2 to 1000 characters long'],
      maxlength: [1000, 'Comment must be 2 to 1000 characters long'],
    },
    postId: {
      type: ObjectId,
      required: true,
      immutable: true
    },
    author: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    likes: {
      type: [String],
      default: []
    },
  },
  { timestamps: true }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;
