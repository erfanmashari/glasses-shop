const Seller = require("../models/seller.model");
const { jsonResponse, checkDataExist } = require("../functions");

const seller_index = async (req, res) => {
  await Seller.find()
    .sort({ createdAt: -1 })
    .then((sellers) => {
      res.json(jsonResponse(200, { sellers }));
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { seller_index }
