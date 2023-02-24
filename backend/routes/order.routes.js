const express = require("express");
const orderController = require("../controllers/order.controller")

const orderRoutes = express.Router();

orderRoutes.post("/", orderController.add_order);
orderRoutes.get("/:id", orderController.order_single);

module.exports = orderRoutes;