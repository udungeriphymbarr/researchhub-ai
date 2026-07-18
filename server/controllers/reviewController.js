const Review = require("../models/Review");
const Product = require("../models/Product");


const createReview = async (req, res) => {

    try {

        const { product, rating, comment } = req.body;

        // Prevent duplicate reviews
        const existingReview = await Review.findOne({
            user: req.user.id,
            product,
        });

        if (existingReview) {

            return res.status(400).json({

                success: false,
                message: "You already reviewed this product."

            });

        }

        const review = await Review.create({

            user: req.user.id,
            product,
            rating,
            comment,

        });

        res.status(201).json({

            success: true,
            review,

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success:false,
            message:"Unable to submit review."

        });

    }

};

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

    res.status(500).json({
      success: false,
      message: "Unable to fetch reviews.",
    });

  }
};

const getMyReview = async (req, res) => {

    try {

        const review = await Review.findOne({

            user: req.user.id,

            product: req.params.productId,

        });

        res.json({

            success: true,

            review,

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Unable to fetch review.",

        });

    }

};

const updateReview = async (req, res) => {

    try {

        const { rating, comment } = req.body;

        const review = await Review.findOne({

            _id: req.params.reviewId,

            user: req.user.id,

        });

        if (!review) {

            return res.status(404).json({

                success: false,

                message: "Review not found.",

            });

        }

        review.rating = rating;

        review.comment = comment;

        await review.save();

        res.json({

            success: true,

            review,

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Unable to update review.",

        });

    }

};

module.exports = {
    createReview,
    getProductReviews,
    getMyReview,
    updateReview,
};