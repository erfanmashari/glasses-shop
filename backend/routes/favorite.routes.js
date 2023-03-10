const express = require("express");
const favoriteController = require("../controllers/favorite.controller")

const favoriteRoutes = express.Router();

favoriteRoutes.post("/", favoriteController.add_favorite_product);
favoriteRoutes.delete("/", favoriteController.delete_favorite_product);

module.exports = favoriteRoutes;