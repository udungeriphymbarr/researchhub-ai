const express = require("express");

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
router.post("/", createBlog);

router.put("/:id", updateBlog);

router.delete("/:id", deleteBlog);

module.exports = router;