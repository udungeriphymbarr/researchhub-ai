const express = require("express");

const {
  createProject,
  getProjects,
  getProjectById,
  deleteProject,
  updateProject,
  selectTopic,
} = require("../controllers/projectController");

const router = express.Router();

router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.delete("/:id", deleteProject);
router.put("/:id", updateProject);
router.put("/:id/topic", selectTopic);


module.exports = router;