const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const { userId, title, description } = req.body;

    const project = await Project.create({
      userId,
      title,
      description,
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const { userId } = req.query;

    const projects = await Project.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
};