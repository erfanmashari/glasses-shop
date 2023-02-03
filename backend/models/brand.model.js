const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema(
  {
    nameFa: {  type: String, required: true, maxLength: 200, unique: true },
    nameEn: { type: String, required: true, maxLength: 200, unique: true },
    origin: { type: String, required: true, maxLength: 100 },
    image: { type: Object }
  },
  { timestamps: true, collection: "brands" }
);

const Brand = mongoose.model("Brand", productSchema);

module.exports = Brand;
