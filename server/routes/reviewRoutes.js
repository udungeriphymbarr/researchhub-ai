const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createReview,
  getProductReviews,
  getMyReview,
  updateReview,
} = require("../controllers/reviewController");

// Get current user's review for a product
router.get("/mine/:productId", protect, getMyReview);

// Update a review
router.put("/:reviewId", protect, updateReview);

// Get all reviews for a product
router.get("/:productId", getProductReviews);

// Create a review
router.post("/:productId", protect, createReview);

module.exports = router;
