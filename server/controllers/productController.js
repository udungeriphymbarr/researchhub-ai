const Product = require("../models/Product");
const slugify = require("slugify");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

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

const getProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {

      return res.status(404).json({

        success: false,

        message: "Product not found",

      });

    }

    res.json({

      success: true,

      product,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

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

    const coverTemp = req.files.cover[0].path;

    const pdfTemp = req.files.pdf[0].path;

    const imageUpload = await cloudinary.uploader.upload(
  coverTemp,
  {
    folder: "researchhub-products",
  }
);

const coverImage = imageUpload.secure_url;

fs.unlinkSync(coverTemp);

const pdfFileName = path.basename(pdfTemp);

const pdfDestination = path.join(
  "uploads",
  "pdfs",
  pdfFileName
);

const uploadFolder = path.join("uploads", "pdfs");

if (!fs.existsSync(uploadFolder)) {

    fs.mkdirSync(uploadFolder, {

        recursive: true,

    });

}

fs.renameSync(pdfTemp, pdfDestination);

    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    const product = await Product.create({
      title,
      slug,
      description,
      category,
      price,
      coverImage,
      pdfFile: pdfFileName,
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

// ==========================
// DELETE PRODUCT
// ==========================

const deleteProduct = async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({

      success: true,

      message: "Product deleted successfully."

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Delete failed."

    });

  }

};

// ==========================
// UPDATE PRODUCT
// ==========================

const updateProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndUpdate(

      req.params.id,

      req.body,

      {

        new: true,

      }

    );

    res.json({

      success: true,

      product,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Update failed",

    });

  }

};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};