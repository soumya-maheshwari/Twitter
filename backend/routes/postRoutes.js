const express = require("express");
const { authVerifyToken } = require("../middleware/authVerifyToken");
const { postController } = require("../controllers");
const { multerUpload } = require("../middleware/multer");
const router = express.Router();

router.post(
  "/create",
  authVerifyToken,
  multerUpload.single("photo"),
  postController.createPost
);

router.post("/likePost", authVerifyToken, postController.likePost);

module.exports = router;
