const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { authVerifyToken } = require("../middleware/authVerifyToken");

router.get("/home", authController.home);
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get("/searchUser", authVerifyToken, authController.searchUser);
router.post("/forgot", authVerifyToken, authController.forgotPassword);
router.post("/forgot/verify", authVerifyToken, authController.OtpVerify);
router.post("/resetPassword", authVerifyToken, authController.resetPassword);

module.exports = router;
