const express = require("express");

const {
  saveGeneration,
  getGenerations,
  deleteGeneration,
  getProjectGenerations,
} = require("../controllers/generationController");

const router = express.Router();

router.post("/", saveGeneration);

router.get("/", getGenerations);

router.get(
  "/project/:projectId",
  getProjectGenerations
);

router.delete("/:id", deleteGeneration);

module.exports = router;