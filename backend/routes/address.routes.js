const express = require("express");
const addressController = require("../controllers/address.controller")

const addressRoutes = express.Router();

addressRoutes.get("/", addressController.address_index);
addressRoutes.post("/", addressController.add_address);

module.exports = addressRoutes;