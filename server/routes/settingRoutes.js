const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

const {
  getSettings,

  updateSettings,
} = require("../controllers/settingController");

router.get(
  "/",

  protect,

  admin,

  getSettings,
);

router.put(
  "/",

  protect,

  admin,

  updateSettings,
);

module.exports = router;
