const express = require("express");
const auth = require("../middleware/auth");
const Community = require("../model/community");
const Post = require("../model/post");
const postRoute = express.Router();
const mongoose = require("mongoose");
// create a post
postRoute.post("/create-post", auth, async (req, res) => {
  try {
    const { title, description, community } = req.body;

    if (!title || !description || !community) {
      return res.status(400).json({ msg: "Please enter all the fields" });
    }

    let existingCommunity = await Community.findOne({ name: community });
    if (!existingCommunity) {
      return res.status(404).json({ msg: "Community does not exist" });
    }

    let newPost = new Post({
      uid: req.user,
      description,
      title,
    });
    newPost = await newPost.save();
    console.log(newPost._id);
    existingCommunity.posts = existingCommunity.posts.concat(newPost._id);
    await existingCommunity.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all the posts
postRoute.get("/posts", auth, async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get one post
postRoute.get("/post/:id", auth, async (req, res) => {
  const id = req.params.id;
  console.log(id)
  try {
    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return res.status(404).json({ msg: "Post does not exist" });
    }
    res.json(existingPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = postRoute;
