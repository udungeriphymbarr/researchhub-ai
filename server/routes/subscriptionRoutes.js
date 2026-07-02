const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getSubscription,
} = require("../controllers/subscriptionController");

const router = express.Router();

router.get("/", protect, getSubscription);

module.exports = router;