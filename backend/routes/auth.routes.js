const express = require("express");
const authController = require("../controllers/auth.controller");

const authRoutes = express.Router();

authRoutes.post("/", authController.login);
authRoutes.post("/confirm-code", authController.confirm_code);
authRoutes.post("/user", authController.register);

module.exports = authRoutes;
