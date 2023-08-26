const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  // latestMessage: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   default: "New chat created",
  // },
});

module.exports = mongoose.model("Chat", chatSchema);
