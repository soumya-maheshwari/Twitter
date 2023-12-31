const express = require("express");
const router = express.Router();
const { authVerifyToken } = require("../middleware/authVerifyToken");
const { chatController } = require("../controllers");

router.post("/createChat", authVerifyToken, chatController.createChat);
router.get("/fetchAllChats", authVerifyToken, chatController.fetchAllChats);

module.exports = router;
