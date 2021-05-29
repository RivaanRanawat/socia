const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  usersWhoCounted: [
    {
      userId: {
        type: String,
        required: true,
      },
      userCount: {
        type: Number,
        default: 0,
      },
    },
  ],
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = new mongoose.model("Post", postSchema);
module.exports = Post;
