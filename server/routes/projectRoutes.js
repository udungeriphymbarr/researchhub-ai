const protect = require("../middleware/authMiddleware");
const express = require("express");

const {
  createProject,
  getProjects,
  getProjectById,
  deleteProject,
  updateProject,
  selectTopic
} = require("../controllers/projectController");

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);
router.delete("/:id", protect, deleteProject);
router.put("/:id", protect, updateProject);
router.put("/:id/topic", protect, selectTopic);


module.exports = router;