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

        // Check if the user purchased the product
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
        console.log(product.pdfFile);

        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found.",

            });

        }

        // Generate the Cloudinary URL
        const pdfUrl = cloudinary.url(product.pdfFile, {

            resource_type: "raw",

            secure: true,

        });

        // Fetch the PDF from Cloudinary
        const response = await axios({

            url: pdfUrl,

            method: "GET",

            responseType: "stream",

        });

        // Force download
        res.setHeader(

            "Content-Disposition",

            `attachment; filename="${product.title}.pdf"`

        );

        res.setHeader(

            "Content-Type",

            "application/pdf"

        );

        // Stream PDF to browser
        response.data.pipe(res);

    }

    catch (error) {

        console.log(error.response?.data || error.message);

        res.status(500).json({

            success: false,

            message: "Download failed.",

        });

    }

};


module.exports = {

    getMyOrders,

    downloadProduct,

};