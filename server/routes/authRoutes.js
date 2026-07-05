const express = require("express");

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendVerificationEmail,
} = require(
  "../controllers/authController"
);

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.get("/verify-email/:token", verifyEmail);
router.post("/send-verification-email", sendVerificationEmail);

module.exports = router;