const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

    getMyOrders,

    downloadProduct,

} = require("../controllers/orderController");

router.get(

    "/my-orders",

    protect,

    getMyOrders

);

router.get(

    "/download/:productId",

    protect,

    downloadProduct

);

module.exports = router;