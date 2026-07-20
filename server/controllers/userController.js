const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, university, department, level, name } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name;
    user.university = university;
    user.department = department;
    user.level = level;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch users.",
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.role = req.body.role;

    await user.save();

    res.json({
      success: true,
      message: "Role updated successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUserPlan = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found.",
      });
    }

    user.plan = req.body.plan;

    user.subscriptionStatus =
      req.body.plan === "premium" ? "active" : "inactive";

    await user.save();

    res.json({
      success: true,

      message: "Subscription updated.",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateProfile,
  getProfile,
  getAllUsers,
  updateUserRole,
  updateUserPlan,
};
