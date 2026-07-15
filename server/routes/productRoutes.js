const express = require("express");

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

  createProduct

);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

module.exports = router;