const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/", getCategories);

router.post("/", protect, admin, createCategory);

router.put("/:id", protect, admin, updateCategory);

router.delete("/:id", protect, admin, deleteCategory);

module.exports = router;
