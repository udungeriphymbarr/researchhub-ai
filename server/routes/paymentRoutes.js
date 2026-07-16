const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  initializePayment,
  verifyPayment,
  initializeProductPayment,
  verifyProductPayment,
} = require("../controllers/paymentController");

const router = express.Router();

router.post(
  "/initialize",
  protect,
  initializePayment
);

router.get(
  "/verify/:reference",
  verifyPayment
);

router.post(
  "/product/initialize",
  protect,
  initializeProductPayment
);

router.get(
  "/product/verify/:reference",
  verifyProductPayment
);

module.exports = router;