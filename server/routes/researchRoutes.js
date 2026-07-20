const express = require("express");

const {
  generateProblemStatement,
  generateObjectives,
  generateMethodology,
  generateSignificance,
  generateLiteratureReview,
  generateAbstract,
  generateResearchQuestions,
} = require("../controllers/researchController");

const router = express.Router();

router.post("/problem-statement", generateProblemStatement);
router.post("/objectives", generateObjectives);
router.post("/methodology", generateMethodology);
router.post("/significance", generateSignificance);
router.post("/literature-review", generateLiteratureReview);
router.post("/abstract", generateAbstract);
router.post("/research-questions", generateResearchQuestions);

module.exports = router;
