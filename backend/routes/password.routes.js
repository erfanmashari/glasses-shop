const express = require("express");
const passwordController = require("../controllers/password.controller")

const passwordRoutes = express.Router();

passwordRoutes.post("/", passwordController.set_password);

module.exports = passwordRoutes;