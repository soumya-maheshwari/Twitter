const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },

  // video: {
  //   type: String,
  // },

  likes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Post", postSchema);
