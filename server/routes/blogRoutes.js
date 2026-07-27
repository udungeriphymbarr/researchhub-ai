const express = require("express");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadProduct");

const {
  createBlog,
  getBlogs,
  getFeaturedBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

// Public Routes
router.get("/", getBlogs);

router.get("/featured", getFeaturedBlogs);

router.get("/:slug", getSingleBlog);

// Admin Routes
router.post("/", upload.single("cover"), createBlog);

router.put("/:id", protect, updateBlog);

router.delete("/:id", protect, deleteBlog);

module.exports = router;
