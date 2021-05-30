const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  community: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer
  },
  upVotedBy: [{ type: String }],
  downVotedBy: [{ type: String }],
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
