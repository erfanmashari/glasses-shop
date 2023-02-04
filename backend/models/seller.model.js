const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = new Schema(
  {
    nameFa: { type: String, required: true, maxLength: 200, unique: true },
    nameEn: { type: String, required: true, maxLength: 200, unique: true },
  },
  { timestamps: true, collection: "sellers" }
);

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
