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

const add_seller = async (req, res) => {
  const body = req.body;

  res
    .status(201)
    .json(jsonResponse(201, { message: "قروشنده جدید با موفقیت افزوده شد!" }));
};

module.exports = { seller_index, add_seller };
