const Generation = require("../models/Generation");

const saveGeneration = async (req, res) => {
  try {
    const { userId, type, input, output } = req.body;

    const generation = await Generation.create({
      userId,
      type,
      input,
      output,
    });

    res.status(201).json({
      success: true,
      generation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getGenerations = async (req, res) => {
  try {
    const { userId } = req.query;

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
    const generation = await Generation.findByIdAndDelete(
      req.params.id
    );

    if (!generation) {
      return res.status(404).json({
        success: false,
        message: "Generation not found",
      });
    }

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

module.exports = {
  saveGeneration,
  getGenerations,
  deleteGeneration,
};