const express = require("express");
const cartController = require("../controllers/cart.controller")

const cartRoutes = express.Router();

cartRoutes.post("/", cartController.add_product_to_cart);

module.exports = cartRoutes;