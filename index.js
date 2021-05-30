const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const userRouter = require("./routes/user");
const communityRouter = require("./routes/community");
const postRouter = require("./routes/post");
const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(communityRouter);
app.use(postRouter);

const PORT = process.env.PORT||3001;
app.listen(PORT, () => {
  console.log(`connected at ${PORT}`);
})

mongoose.connect(
  "mongodb://localhost:127.0.0.1:27017/redditClone",
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  () => {
    console.log("mongoose connected");
  }
);
