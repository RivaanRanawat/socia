const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    minLength: 6,
  },
  username: {
    required: true,
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;