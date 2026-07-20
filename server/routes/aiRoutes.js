const express = require("express");

const protect = require("../middleware/authMiddleware");
const subscriptionMiddleware = require("../middleware/subscriptionMiddleware");

const { generateAI } = require("../controllers/aiController");

const router = express.Router();

router.post("/generate", protect, subscriptionMiddleware, generateAI);

module.exports = router;
