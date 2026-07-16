const Order = require("../models/Order");

const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            user: req.user.id,

        })
        .populate("product")
        .sort({ createdAt: -1 });

        res.json({

            success: true,

            orders,

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

const path = require("path");
const fs = require("fs");

const downloadProduct = async (req, res) => {

    try {

        const Order = require("../models/Order");
        const Product = require("../models/Product");

        const { productId } = req.params;

        // Check purchase
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

        const filePath = path.join(

            __dirname,

            "..",

            "uploads",

            "pdfs",

            product.pdfFile

        );

        if (!fs.existsSync(filePath)) {

            return res.status(404).json({

                success: false,

                message: "PDF not found.",

            });

        }

        res.download(

            filePath,

            `${product.title}.pdf`

        );

    }

    catch (error) {

        console.log(error);

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