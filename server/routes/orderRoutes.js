const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getMyOrders,

  downloadProduct,

  getAllOrders,
} = require("../controllers/orderController");

router.get(
  "/my-orders",

  protect,

  getMyOrders,
);

router.get(
  "/download/:productId",

  protect,

  downloadProduct,
);

router.get("/all", protect, admin, getAllOrders);

module.exports = router;
