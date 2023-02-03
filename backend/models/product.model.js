const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    nameFa: {
      type: String,
      required: true,
      maxLength: 200,
      unique: true,
    },
    nameEn: { type: String, required: true, maxLength: 200, unique: true },
    brandNameFa: {
      type: String,
      required: true,
      maxLength: 200,
    },
    brandNameEn: {
      type: String,
      required: true,
      maxLength: 200,
    },
    origin: { type: String, required: true },
    model: { type: Number, required: true },
    price: { type: Number, required: true },
    discountPercent: { type: Number },
    discountedPrice: { type: Number },
    isAvailable: { type: Boolean },
    isOriginal: { type: Boolean },
    isSpecialSale: { type: Boolean },
    isFreeDelivery: { type: Boolean },
    numberOfProducts: { type: Number, required: true },
    introduction: { type: String },
    categories: { type: [Object] },
    features: { type: [Object] },
    images: { type: [Object] },
    items: { type: Object },
    providers: { type: [Object] },
  },
  { timestamps: true, collection: "products" }
);

const Prouct = mongoose.model("Product", productSchema);

module.exports = Prouct;
