const Product = require("../models/Product");

// ==========================
// GET ALL PRODUCTS
// ==========================

const getProducts = async (req, res) => {
  try {

    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      products,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });

  }
};

// ==========================
// CREATE PRODUCT
// ==========================

const createProduct = async (req, res) => {

  try {

    const {
      title,
      description,
      category,
      price,
    } = req.body;

    if (!req.files) {

      return res.status(400).json({
        success: false,
        message: "Files missing",
      });

    }

    const coverImage = req.files.cover[0].path;

    const pdfFile = req.files.pdf[0].path;

    const product = await Product.create({

      title,

      description,

      category,

      price,

      coverImage,

      pdfFile,

    });

    res.status(201).json({

      success: true,

      message: "Product uploaded successfully.",

      product,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Upload failed",

    });

  }

};

module.exports = {
  getProducts,
  createProduct,
};