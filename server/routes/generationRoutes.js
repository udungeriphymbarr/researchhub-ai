const express = require("express");
const  authMiddleware = require("../middleware/authMiddleware");

const {
  saveGeneration,
  getGenerations,
  deleteGeneration,
  getProjectGenerations,
} = require("../controllers/generationController");

const router = express.Router();

router.post("/",  authMiddleware, saveGeneration);

router.get("/",  authMiddleware, getGenerations);

router.get("/project/:projectId", authMiddleware, getProjectGenerations);

router.delete("/:id", authMiddleware, deleteGeneration);

module.exports = router;