const { profileController } = require("../controllers");
const { authVerifyToken } = require("../middleware/authVerifyToken");
const express = require("express");
const { multerUpload } = require("../middleware/multer");
const router = express.Router();

router.post("/followUser", authVerifyToken, profileController.followUser);
router.post("/unfollowUser", authVerifyToken, profileController.unfollowUser);
router.get(
  "/getProfile/:username",
  authVerifyToken,
  profileController.accessProfile
);

router.get(
  "/getAllBookmarks",
  authVerifyToken,
  profileController.getAllBookmarks
);
router.put(
  "/editProfile",
  authVerifyToken,
  multerUpload.single("pic"),
  profileController.editProfile
);

module.exports = router;
