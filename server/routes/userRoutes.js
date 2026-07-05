const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  updateProfile,
  getProfile,
} = require("../controllers/userController");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;