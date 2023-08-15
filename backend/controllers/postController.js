const User = require("../models/userModel");
const Post = require("../models/postModel");
const { ErrorHandler } = require("../middleware/ErrorHandler");

const createPost = async (req, res, next) => {
  try {
    const { content } = req.body;
    console.log(content, "content");

    if (!content) {
      return next(new ErrorHandler(400, "Text Content is required"));
    }

    const user = req.user;
    const userid = user._id;
    console.log(userid, "user id");
    if (!user) {
      return next(new ErrorHandler(400, "Login or signup to continue"));
    }

    // const file = req.file ? req.file : null;
    // console.log(file);

    let file = req.file ? req.file.filename : null;
    let image = "media/" + file;
    const newPost = await Post.create({
      user: userid,
      content: content,
      // image: req.file ? req.file.filename : null,
      image: image,
    });

    console.log(newPost);

    // Update the user's posts array
    const updatedUser = await User.findByIdAndUpdate(userid, {
      $push: { no_of_posts: newPost._id },
    });

    return res.status(200).json({
      success: true,
      newPost,
      updatedUser,
      msg: "New post created",
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const user = req.user;
    const userid = user._id;
    const { postid } = req.params;

    console.log(postid);

    if (!postid) {
      return next(new ErrorHandler(400, "No post found"));
    }

    const post = await Post.findOne({
      _id: postid,
    });

    console.log(post);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const likePost = async (req, res, next) => {
  try {
    const user = req.user;
    const userid = user._id;
    console.log(userid, "user id");

    if (!user) {
      return next(new ErrorHandler(400, "Login or signup to continue"));
    }

    const { postid } = req.body;
    console.log(postid);

    if (!postid) {
      return next(new ErrorHandler(404, "No post found"));
    }

    const likedPost = await Post.findById(postid);

    console.log(likedPost);

    if (likedPost.likes.includes(userid)) {
      return next(new ErrorHandler(400, "You have already liked this post"));
    } else {
      likedPost.likes.push(userid);

      console.log(likedPost);
      await likedPost.save();
    }

    return res.status(200).json({
      success: true,
      likedPost,
      msg: "Post liked",
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  createPost,
  likePost,
};
