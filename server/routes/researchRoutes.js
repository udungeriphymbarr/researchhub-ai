const express = require("express");

const {
  generateProblemStatement,
  generateObjectives,
} = require("../controllers/researchController");

const router = express.Router();

router.post(
  "/problem-statement",
  generateProblemStatement
);

router.post(
  "/objectives",
  generateObjectives
);

module.exports = router;