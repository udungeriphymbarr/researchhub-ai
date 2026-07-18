const express = require("express");

const adminMiddleware = require("../middleware/adminMiddleware");

const upload = require("../middleware/uploadProduct");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");


const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getAdminProducts,
} = require("../controllers/productController");

const router = express.Router();

// GET ALL PRODUCTS
router.get(
    "/admin/all",
    protect,
    adminOnly,
    getAdminProducts
);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post(

  "/",

  upload.fields([
    {
      name: "cover",
      maxCount: 1,
    },
    {
      name: "pdf",
      maxCount: 1,
    },
  ]),

  adminMiddleware, createProduct

);

router.delete("/:id", adminMiddleware, deleteProduct);

router.put("/:id", adminMiddleware, updateProduct);

module.exports = router;