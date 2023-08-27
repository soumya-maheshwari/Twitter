const { ErrorHandler } = require("../middleware/ErrorHandler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const createChat = async (req, res, next) => {
  try {
    const user = req.user;
    const userid = user._id;

    const { userId } = req.body;

    if (!user) {
      return next(new ErrorHandler(400, "Login or signup to continue"));
    }

    var isChat = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: userid } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    // console.log(isChat);
    // let chatData = null;

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      const chatData = await Chat.create({
        users: [req.user._id, userId],
      });
      const fullChat = await Chat.findOne({ _id: chatData._id }).populate(
        "users",
        "-password"
      );

      res.status(200).json({
        fullChat,
        success: true,
        msg: "chat created successfully",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchAllChats = async (req, res, next) => {
  try {
    const user = req.user;
    const userid = user._id;

    const chat = await Chat.find({
      users: {
        $elemMatch: {
          $eq: userid,
        },
      },
    }).populate("users", "-password");

    // console.log(chat);

    const USER = await User.populate(chat, {
      // select: "username email name _id",
      path: "latestMessage.sender",
      select: "username email name _id",
    });

    res.status(200).json({
      USER,
      msg: "chat fetched successfully",
      success: true,
    });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};
module.exports = {
  createChat,
  fetchAllChats,
};
