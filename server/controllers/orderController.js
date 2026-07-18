const Order = require("../models/Order");
const cloudinary = require("../config/cloudinary");
const axios = require("axios");


const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            user: req.user.id,

        })
        .populate("product")
        .sort({ createdAt: -1 });

        const validOrders = orders.filter(order => order.product);

        res.json({

            success: true,

            orders: validOrders,

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Unable to fetch library.",

        });

    }

};


const downloadProduct = async (req, res) => {
  try {
    const Product = require("../models/Product");

    const { productId } = req.params;

    const order = await Order.findOne({
      user: req.user.id,
      product: productId,
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You haven't purchased this product.",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const downloadUrl = cloudinary.url(product.pdfFile, {
      resource_type: "raw",
      secure: true,
      flags: "attachment",
    });

    return res.json({
      success: true,
      downloadUrl,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Download failed.",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("product", "title")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch orders.",
    });

  }
};


module.exports = {

    getMyOrders,

    downloadProduct,

    getAllOrders,
};