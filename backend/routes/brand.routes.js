const express = require("express");
const multer = require('multer');
const brandController = require("../controllers/brand.controller");

const brandRoutes = express.Router();

// setting options for multer
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

brandRoutes.get("/", brandController.brand_index);
brandRoutes.post(
  "/",
  upload.single("imageFile"),
  brandController.add_brand
);

module.exports = brandRoutes;
