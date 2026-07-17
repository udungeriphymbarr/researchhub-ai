const Review = require("../models/Review");
const Product = require("../models/Product");
const Order = require("../models/Order");

// Create review
const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    // Must have purchased
    const order = await Order.findOne({
      user: req.user.id,
      product: productId,
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "Purchase required.",
      });
    }

    // Prevent duplicate review
    const exists = await Review.findOne({
      user: req.user.id,
      product: productId,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product.",
      });
    }

    const review = await Review.create({
      user: req.user.id,
      product: productId,
      rating,
      comment,
    });

    // Update product rating
    const reviews = await Review.find({ product: productId });

    const average =
      reviews.reduce((sum, r) => sum + r.rating, 0) /
      reviews.length;

    await Product.findByIdAndUpdate(productId, {
      rating: average.toFixed(1),
    });

    res.json({
      success: true,
      review,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to submit review.",
    });
  }
};

// Get product reviews
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch reviews.",
    });
  }
};

module.exports = {
  createReview,
  getProductReviews,
};