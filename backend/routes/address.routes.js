const express = require("express");
const addressController = require("../controllers/address.controller")

const addressRoutes = express.Router();

addressRoutes.post("/", addressController.add_address);
addressRoutes.put("/", addressController.address_update);

module.exports = addressRoutes;