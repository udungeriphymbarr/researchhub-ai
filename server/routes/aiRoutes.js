const express = require("express");

const {
    generateAI,
    supervisorAI,
} = require("../controllers/aiController");

const router = express.Router();

router.post("/generate", generateAI);

router.post("/supervisor", supervisorAI);

module.exports = router;