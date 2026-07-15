const jwt = require("jsonwebtoken");

const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {

  try {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });

    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {

      return res.status(401).json({
        success: false,
        message: "User not found",
      });

    }

    if (user.role !== "admin") {

      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });

    }

    req.user = user;

    next();

  } catch (error) {

    console.log(error);

    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

  }

};

module.exports = adminMiddleware;