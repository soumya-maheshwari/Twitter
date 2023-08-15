const { ErrorHandler } = require("../middleware/ErrorHandler");
const User = require("../models/userModel");

const accessProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    console.log(username, "username");
    if (!username) {
      return next(new ErrorHandler(400, "Username required"));
    }

    const loggedInUser = req.user;
    console.log(loggedInUser, "userr");

    const user = await User.findOne({
      username: username,
    });

    console.log(user);

    if (!user) {
      return next(new ErrorHandler(404, "User not found"));
    }

    const profile = await User.findOne({ username: username });
    console.log(profile);

    return res.status(200).json({
      success: true,
      profile,
      msg: "Get profile",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const followUser = async (req, res, next) => {
  try {
    const user = req.user;
    const userid = user.id;

    console.log(user);

    const { userToFollow } = req.body;
    console.log(userToFollow);

    if (!userToFollow) {
      return next(new ErrorHandler(404, "Please select a user to follow"));
    }

    const userDB = await User.findById(userid);

    console.log(userDB);
    const followUser = await User.findById(userToFollow);
    console.log(followUser);

    if (!followUser) {
      return next(new ErrorHandler(400, "No user found with this id"));
    }

    if (userDB.following.includes(userToFollow)) {
      return next(new ErrorHandler(400, "You are already following this user"));
    } else {
      followUser.followers.push(userid);
      userDB.following.push(userToFollow);
    }

    await userDB.save();
    console.log(userDB);
    await followUser.save();

    console.log(followUser);
    return res.status(200).json({
      success: true,
      msg: "User followed",
      userDB,
      followUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const unfollowUser = async (req, res, next) => {
  try {
    const user = req.user;
    const userid = user.id;

    console.log(user);

    const { userToUnfollow } = req.body;
    console.log(userToUnfollow);

    if (!userToUnfollow) {
      return next(new ErrorHandler(404, "Please select a user to unfollow"));
    }

    const userDB = await User.findById(userid);

    console.log(userDB);
    const unfollowUser = await User.findById(userToUnfollow);
    console.log(unfollowUser);

    if (!unfollowUser) {
      return next(new ErrorHandler(400, "No user found with this id"));
    }

    if (!userDB.following.includes(userToUnfollow)) {
      return next(new ErrorHandler(400, "You are not following this user"));
    } else {
      unfollowUser.followers.pull(userid);
      userDB.following.pull(userToUnfollow);
    }

    await userDB.save();
    console.log(userDB);
    await unfollowUser.save();

    console.log(unfollowUser);

    return res.status(200).json({
      success: true,
      msg: "User unfollowed",
      userDB,
      followUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  accessProfile,
  followUser,
  unfollowUser,
};
