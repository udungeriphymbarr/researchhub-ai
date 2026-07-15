const express = require("express");

const adminMiddleware = require("../middleware/adminMiddleware");

const upload = require("../middleware/upload");
const {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", getProducts);

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