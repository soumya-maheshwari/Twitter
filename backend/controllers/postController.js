const User = require("../models/userModel");
const Post = require("../models/postModel");
const { ErrorHandler } = require("../middleware/ErrorHandler");
const path = require("path");

const createPost = async (req, res, next) => {
  try {
    const { content } = req.body;
    // console.log(content, "content");

    if (!content) {
      return next(new ErrorHandler(400, "Text Content is required"));
    }

    const user = req.user;
    const userid = user._id;

    // console.log(userid, "user id");

    if (!user) {
      return next(new ErrorHandler(400, "Login or signup to continue"));
    }
    // const baseUrl = "http://localhost:5000";
    const baseUrl = "https://fullstackapp-klwm.onrender.com/";

    // const file = req.file ? req.file : null;
    // console.log(file);

    let file = req.file ? req.file.filename : null;
    // const image = req.file ? req.file.path : "";
    const image = req.file ? baseUrl + "/media/" + req.file.filename : null;
    const newPost = await Post.create({
      user: userid,
      content: content,
      // image: req.file ? req.file.filename : null,
      image: image,
    });

    // console.log(newPost);

    // Update the user's posts array
    const updatedUser = await User.findByIdAndUpdate(userid, {
      $push: { no_of_posts: newPost._id },
    });
    // console.log(updatedUser);

    return res.status(200).json({
      success: true,
      newPost,
      updatedUser,
      msg: "New post created",
    });
  } catch (error) {
    next(error);
    // console.log(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const user = req.user;
    const userid = user._id;
    const { postid } = req.params;

    // console.log(postid);

    if (!postid) {
      return next(new ErrorHandler(400, "No post found"));
    }

    const post = await Post.findOne({
      _id: postid,
    });

    // console.log(post);

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
    // console.log(error);
  }
};

const likePost = async (req, res, next) => {
  try {
    const user = req.user;
    const userid = user._id;
    // console.log(userid, "user id");

    if (!user) {
      return next(new ErrorHandler(400, "Login or signup to continue"));
    }

    const { postid } = req.body;
    // console.log(postid);

    if (!postid) {
      return next(new ErrorHandler(404, "No post found"));
    }

    const likedPost = await Post.findById(postid);

    // console.log(likedPost);

    // if (likedPost.likes.includes(userid)) {
    //   return next(new ErrorHandler(400, "You have already liked this post"));
    // } else {
    //   likedPost.likes.push(userid);

    //   await likedPost.save();
    // }

    const likedIndex = likedPost.likes.indexOf(userid);

    if (likedIndex !== -1) {
      // The user has already liked the post, so remove the like
      likedPost.likes.splice(likedIndex, 1);
    } else {
      // The user has not liked the post, so add the like
      likedPost.likes.push(userid);
    }

    await likedPost.save();

    return res.status(200).json({
      success: true,
      likedPost,
      // msg: "Post liked",
      msg: likedIndex !== -1 ? "Post disliked" : "Post liked",
    });
  } catch (error) {
    next(error);
    // console.log(error);
  }
};

const getHomePageFeeds = async (req, res, next) => {
  try {
    const user = req.user;
    const userid = user._id;
    // console.log(userid, "user id");

    if (!user) {
      return next(new ErrorHandler(400, "Login or signup to continue"));
    }
    const currentUser = await User.findById(userid).populate(
      "following",
      "_id"
    );

    // console.log(currentUser);

    const followingIds = currentUser.following.map((user) => user._id);

    const homeFeed = await Post.find({ user: { $in: followingIds } }).populate(
      {
        path: "user",

        select: "name username",
      }
      // "user",
      // // "username",
      // "name"
    );

    return res.json({
      success: true,
      homeFeed,
      msg: "Posts fetched",
    });
  } catch (error) {
    next(error);
    // console.log(error);
  }
};

const addToBookmarks = async (req, res, next) => {
  try {
    const user = req.user;
    const userid = user._id;
    // console.log(userid, "user id");

    if (!user) {
      return next(new ErrorHandler(400, "Login or signup to continue"));
    }
    const { postid } = req.body;
    // console.log(postid);

    if (!postid) {
      return next(new ErrorHandler(400, "No post found"));
    }

    // Check if the post is already in the user's bookmarks
    if (user.bookmarks.includes(postid)) {
      return next(new ErrorHandler(400, "Post already added to bookmarks"));
    }

    user.bookmarks.push(postid);
    await user.save();

    // console.log(user);

    return res.status(200).json({
      success: true,
      updatedUser: user,
      msg: "post added to bookmarks",
    });
  } catch (error) {
    next(error);
    // console.log(error);
  }
};

const removeFromBookmarks = async (req, res, next) => {
  try {
    const user = req.user;
    const userid = user._id;

    if (!user) {
      return next(new ErrorHandler(400, "Login or signup to continue"));
    }

    const { postid } = req.body;

    if (!postid) {
      return next(new ErrorHandler(400, "No post found"));
    }

    // Find the index of the postid in the bookmarks array
    const bookmarkIndex = user.bookmarks.indexOf(postid);

    if (bookmarkIndex === -1) {
      return next(new ErrorHandler(404, "Post not found in bookmarks"));
    }

    // Remove the postid from bookmarks array
    user.bookmarks.splice(bookmarkIndex, 1);
    await user.save();

    return res.status(200).json({
      success: true,
      updatedUser: user,
      msg: "post removed from bookmarks",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  likePost,
  getHomePageFeeds,
  getPost,
  addToBookmarks,
  // getAllBookmarks,
  // commentPost,
  removeFromBookmarks,
};
