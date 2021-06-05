const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  description: {
    required: true,
    type: String,
  },
  creator: {
    required: true,
    type: String,
  },
  topic: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  posts: [
    {
      type: String,
    },
  ],
  subscribedBy: [
    {
      type: String,
    },
  ],
  // 1 because the creator will be subscribed automatically
  subscriberCount: {
    type: Number,
    default: 1,
  },
  iconUrl: {
    type: String
  }
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
