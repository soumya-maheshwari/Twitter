const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { authVerifyToken } = require("../middleware/authVerifyToken");

router.get("/home", authController.home);
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get("/searchUser", authVerifyToken, authController.searchUser);

module.exports = router;
