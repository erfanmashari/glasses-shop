const Address = require("../models/address.model");
const { jsonResponse, checkDataExist } = require("../functions");

// get all addresses
const address_index = async (req, res) => {
  await Address.find()
    .sort({ createdAt: -1 })
    .then((addresses) => {
      res.json(jsonResponse(200, { addresses }));
    })
    .catch((err) => {
      console.log(err);
    });
};

// create new addrss for user
const add_address = (req, res) => {
  res.json(jsonResponse(200, { message: "آدرس جدید با موفقیت افزوده شد!" }));
};

module.exports = { address_index, add_address };
