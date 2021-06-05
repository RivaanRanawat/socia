const express = require("express");
const Community = require("../model/community");

const communityRouter = express.Router();
const auth = require("../middleware/auth");
const User = require("../model/user");
const Post = require("../model/post");

/*
Karma:
3-> Posting
5-> Creating Community
2-> Joining Community
1-> getting upvotes
2-> getting comments
*/

// Creating a community
communityRouter.post("/create-community", auth, async (req, res) => {
  try {
    const { name, description, topic, iconUrl } = req.body;
    if (!name || !description) {
      return res.status(400).json({ msg: "Please enter name and description" });
    }
    const existingCommunity = await Community.findOne({ name });
    if (existingCommunity) {
      return res
        .status(400)
        .json({ msg: "Community with the same name already exists" });
    }
    let topicDb = topic ?? "";
    const user = await User.findById(req.user)
    user.karma +=5;
    await user.save()
    const creator = req.user;
    let newCommunity = new Community({
      name,
      description,
      topic: topicDb,
      creator,
      subscribedBy: [creator],
      iconUrl
    });
    newCommunity = await newCommunity.save();
    let creatorDetails = await User.findById(creator);
    const creatorName = creatorDetails.username;
    res.json({ newCommunity, creatorName });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Showing all the communities
communityRouter.get("/communities", auth, async (req, res) => {
  try {
    const allCommunities = await Community.find({});
    res.json(allCommunities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get a community by name
communityRouter.get("/community/:name", auth, async (req, res) => {
  const name = req.params.name;
  console.log(name);
  try {
    const community = await Community.findOne({ name });
    if (!community) {
      return res
        .status(400)
        .json({ msg: "Community with this name does not exist" });
    }
    res.json(community);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get a specific communities post
communityRouter.get("/community/posts/:name", auth, async (req, res) => {
  const name = req.params.name;
  try {
    const community = await Community.findOne({ name });
    if (!community) {
      return res
        .status(404)
        .json({ msg: "Community with this name does not exist" });
    }
    let psts = community.posts.map(async (post) => await Post.findById(post));

    const results = await Promise.all(psts);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = communityRouter;
