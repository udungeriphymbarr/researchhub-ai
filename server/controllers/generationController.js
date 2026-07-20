const Generation = require("../models/Generation");

const saveGeneration = async (req, res) => {
  try {
    const { projectId, type, input, output } = req.body;

    console.log("USER:", req.user);
    console.log("BODY:", req.body);

    const generation = await Generation.create({
      userId: req.user._id,
      projectId,
      type,
      input,
      output,
    });

    res.status(201).json({
      success: true,
      generation,
    });
  } catch (error) {
    console.log("SAVE GENERATION ERROR");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getGenerations = async (req, res) => {
  try {
    const userId = req.user._id;

    const generations = await Generation.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      generations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteGeneration = async (req, res) => {
  try {
    const generation = await Generation.findById(req.params.id);

    if (!generation) {
      return res.status(404).json({
        success: false,
        message: "Generation not found",
      });
    }

    if (generation.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await generation.deleteOne();

    res.status(200).json({
      success: true,
      message: "Generation deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProjectGenerations = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user._id;

    const generations = await Generation.find({
      projectId,
      userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      generations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  saveGeneration,
  getGenerations,
  deleteGeneration,
  getProjectGenerations,
};
