const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const { ErrorHandler } = require("../middleware/ErrorHandler");

const sendMessage = async (req, res, next) => {
  try {
    const { content, chatId } = req.body;
    const user = req.user;
    const userid = user._id;

    if (!content) {
      next(new ErrorHandler(400, "Enter some text to send"));
    }

    if (!chatId) {
      next(new ErrorHandler(400, "invalid data passed into request"));
    } else {
      var newMessage = {
        sender: userid,
        content: content,
        chat: chatId,
      };

      var message = await Message.create(newMessage);
      console.log(message, "message");
      message = await message.populate("sender", "name email username");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "name email username",
      });

      res.json({
        message,
        success: true,
        msg: "Message sent",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchAllMessages = async (req, res, next) => {
  try {
    const { chatId } = req.body;
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email username")
      .populate("chat");
    console.log(messages);
    res.json({
      msg: "messages fetching successful",
      messages: messages,
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  sendMessage,
  fetchAllMessages,
};
