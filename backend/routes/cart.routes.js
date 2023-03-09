const express = require("express");
const cartController = require("../controllers/cart.controller")

const cartRoutes = express.Router();

cartRoutes.post("/", cartController.add_product_to_cart);
cartRoutes.delete("/", cartController.delete_product_from_cart);

module.exports = cartRoutes;