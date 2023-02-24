const express = require("express");
const transactionController = require("../controllers/transaction.controller")

const transactionRoutes = express.Router();

transactionRoutes.post("/", transactionController.add_transaction);

module.exports = transactionRoutes;