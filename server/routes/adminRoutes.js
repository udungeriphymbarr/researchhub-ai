const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const { getDashboardStats } = require("../controllers/adminController");

router.get("/dashboard", protect, adminOnly, getDashboardStats);

module.exports = router;
