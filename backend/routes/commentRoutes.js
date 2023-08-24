const express = require("express");
const router = express.Router();
const { authVerifyToken } = require("../middleware/authVerifyToken");
const { commentController } = require("../controllers");

router.post("/addComment", authVerifyToken, commentController.addComment);

module.exports = router;
