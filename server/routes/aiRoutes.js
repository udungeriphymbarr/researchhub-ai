const express = require("express");

const {
  generateTopicsAI,
} = require("../controllers/aiController");

const router = express.Router();

router.post("/topics", generateTopicsAI);

module.exports = router;