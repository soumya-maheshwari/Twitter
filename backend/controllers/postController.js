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

    return res.status(200).json({
      success: true,
      newPost,
      msg: "New post created",
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  createPost,
};
