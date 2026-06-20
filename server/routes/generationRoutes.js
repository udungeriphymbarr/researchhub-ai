const express = require("express");

const {
  saveGeneration,
  getGenerations,
  deleteGeneration,
} = require("../controllers/generationController");

const router = express.Router();

router.post("/", saveGeneration);
router.get("/", getGenerations);
router.delete("/:id", deleteGeneration);

module.exports = router;