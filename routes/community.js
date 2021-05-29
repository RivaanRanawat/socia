const express = require("express");
const Community = require("../model/community");

const communityRouter = express.Router();
const auth = require("../middleware/auth");
const User = require("../model/user");

// Creating a community
communityRouter.post("/create-community", auth, async (req, res) => {
  try {
    const { name, description, topic } = req.body;
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
    const creator = req.user;
    let newCommunity = new Community({
      name,
      description,
      topic: topicDb,
      creator,
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
    res.json(allCommunities)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

communityRouter.get("/community/:name", auth, async (req, res) => {
    const name = req.params.name;
    console.log(name);
    try {
        const community = await Community.findOne({name});
        if(!community) {
            return res.status(400).json({msg: "Community with this name does not exist"})
        }
        res.json(community)
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

module.exports = communityRouter;