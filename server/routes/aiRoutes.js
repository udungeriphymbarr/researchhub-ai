const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
    generateAI,
} = require("../controllers/aiController");

const router = express.Router();

router.post("/generate", protect, generateAI);

module.exports = router;