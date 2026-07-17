const express = require("express");

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
} = require(
  "../controllers/authController"
);

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.get("/verify-email/:token", verifyEmail);

router.get("/me", protect, getMe);

module.exports = router;