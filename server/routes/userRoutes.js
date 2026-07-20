const express = require("express");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  updateProfile,
  getProfile,
  getAllUsers,
  updateUserRole,
  updateUserPlan,
} = require("../controllers/userController");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.get("/all", protect, adminOnly, getAllUsers);

router.put("/role/:id", protect, adminOnly, updateUserRole);

router.put("/plan/:id", protect, adminOnly, updateUserPlan);

module.exports = router;
