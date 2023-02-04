const express = require("express");
const sellerController = require("../controllers/seller.controller");

const sellerRoutes = express.Router();

sellerRoutes.get("/", sellerController.seller_index);
sellerRoutes.post("/", sellerController.add_seller);

module.exports = sellerRoutes;
