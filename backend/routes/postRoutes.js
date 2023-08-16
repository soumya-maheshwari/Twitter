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
router.get("/getPost/:postid", authVerifyToken, postController.getPost);
router.get("/homeFeeds", authVerifyToken, postController.getHomePageFeeds);
router.post("/addToBookmarks", authVerifyToken, postController.addToBookmarks);
// router.post("/commentPost", authVerifyToken, postController.commentPost);

module.exports = router;
