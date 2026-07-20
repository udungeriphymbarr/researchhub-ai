const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      userId: req.user.id,
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
    const projects = await Project.find({
      userId: req.user.id,
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

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    res.status(200).json({
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

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    if (project.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
      },
      {
        new: true,
      },
    );

    res.status(200).json({
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

const selectTopic = async (req, res) => {
  try {
    const { topic } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        selectedTopic: topic,
      },
      {
        new: true,
      },
    );

    res.status(200).json({
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

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  deleteProject,
  updateProject,
  selectTopic,
};
