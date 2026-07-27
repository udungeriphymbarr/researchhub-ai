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
  getAdminBlogs,

  getBlogStats,
} = require("../controllers/blogController");

const router = express.Router();

// Public Routes
router.get("/", getBlogs);

router.get("/featured", getFeaturedBlogs);

router.get("/admin/all", protect, getAdminBlogs);

router.get("/admin/stats", protect, getBlogStats);

router.get("/:slug", getSingleBlog);

// Admin Routes
router.post(
  "/",
  protect,
  upload.single("cover"),
  createBlog
);

router.put("/:id", protect, upload.single("cover"), updateBlog);

router.delete("/:id", protect, deleteBlog);

module.exports = router;
