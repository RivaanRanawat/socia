const express = require("express");
const auth = require("../middleware/auth");
const Community = require("../model/community");
const Post = require("../model/post");
const User = require("../model/user");
const postRoute = express.Router();

// upvoting a post
postRoute.post("/post/upvote/:id", auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if(!post) {
      return res.status(404).json({msg: "Post does not exist"})
    }
    if(post.upVotedBy.includes(req.user)) {
      return res.json({msg: "Already Upvoted!"})
    }
    if(post.downVotedBy.includes(req.user)) {
      const index = post.downVotedBy.indexOf(req.user)
      post.downVotedBy.splice(index, 1);
    }
    post.upVotedBy.push(req.user);
    await post.save();
    res.json();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

postRoute.post("/post/downvote/:id", auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if(!post) {
      return res.status(404).json({msg: "Post does not exist"})
    }
    if(post.downVotedBy.includes(req.user)) {
      return res.json({msg: "Already Downvoted!"})
    }
    if(post.upVotedBy.includes(req.user)) {
      const index = post.upVotedBy.indexOf(req.user)
      post.upVotedBy.splice(index, 1);
    }
    post.downVotedBy.push(req.user);
    await post.save();
    res.json();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all the posts the user is subscribed to
postRoute.get("/posts/user/:id", auth, async (req, res) => {
  try {
    const communities = await Community.find({ subscribedBy: req.params.id });
    let posts = [];
    for (let i = 0; i < communities.length; i++) {
      for (let j = 0; j < communities[i].posts.length; j++) {
        const post = await Post.find({ _id: communities[i].posts[j] });
        posts.push(post[0]);
      }
    }
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// create a post
postRoute.post("/create-post", auth, async (req, res) => {
  try {
    const { title, description, community, imageUrl } = req.body;

    if (!title || !description || !community) {
      return res.status(400).json({ msg: "Please enter all the fields" });
    }

    let existingCommunity = await Community.findOne({ name: community });
    if (!existingCommunity) {
      return res.status(404).json({ msg: "Community does not exist" });
    }

    const user = await User.findById(req.user);
    let newPost = new Post({
      uid: req.user,
      description,
      title,
      community,
      image: imageUrl,
      username: user.username,
    });
    newPost = await newPost.save();
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
