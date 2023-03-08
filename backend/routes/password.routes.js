const express = require("express");
const passwordController = require("../controllers/password.controller")

const passwordRoutes = express.Router();

passwordRoutes.post("/", passwordController.set_password);
passwordRoutes.post("/change", passwordController.change_password);
passwordRoutes.post("/confirm", passwordController.confirm_code);

module.exports = passwordRoutes;