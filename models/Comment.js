const { Schema, model, Types: { ObjectId } } = require('mongoose');

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'Content required'],
      minlength: [1, 'Comment must be 1 to 1000 characters long'],
      maxlength: [1000, 'Comment must be 1 to 1000 characters long'],
    },
    quote : {
      type: String,
      default: null
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
    votes: {
      type: Number,
      default: 0
    },
    voters: {
      type: [String],
      default: []
    },
    updated: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;
