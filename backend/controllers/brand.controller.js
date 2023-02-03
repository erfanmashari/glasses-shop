const Brand = require("../models/brand.model");
const path = require("path");
const fs = require("fs");
const { jsonResponse, checkDataExist } = require("../functions");

const brand_index = (req, res) => {
  Brand.find()
    .sort({ createdAt: -1 })
    .then((brands) => {
      res.json(jsonResponse(200, { brands }));
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { product_index, add_product };
