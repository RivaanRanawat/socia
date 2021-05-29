const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true
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
  }
});

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
