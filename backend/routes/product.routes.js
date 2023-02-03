const express = require("express");
const multer = require('multer');
const productController = require("../controllers/product.controller");

const productRoutes = express.Router();

// setting options for multer
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

productRoutes.get("/", productController.product_index);
productRoutes.post(
  "/",
  upload.array("imagesFiles"),
  productController.add_product
);

module.exports = productRoutes;
