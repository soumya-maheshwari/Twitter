const express = require("express");
const { authVerifyToken } = require("../middleware/authVerifyToken");
const router = express.Router();
const { messageController } = require("../controllers");

router.post("/sendMessage", authVerifyToken, messageController.sendMessage);
router.get(
  "/getAll/:chatId",
  authVerifyToken,
  messageController.fetchAllMessages
);

module.exports = router;
