const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },

    profile_pic: {
      type: String,
    },
    bio: {
      type: String,
    },
    no_of_posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
  }

  // { timestamps: true }
);

// const UserModel = mongoose.model("user", userSchema);

// module.exports = UserModel;

module.exports = mongoose.model("User", userSchema);
