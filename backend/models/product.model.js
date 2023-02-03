const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    nameFa: {  type: String, required: true, maxLength: 200, unique: true },
    nameEn: { type: String, required: true, maxLength: 200, unique: true },
    price: { type: Number, required: true },
    numberOfProducts: { type: Number, required: true },
    brand: { type: Object, required: true },
    gender: { type: [String], required: true },
    size: { type: [String], required: true },
    images: { type: [Object], required: true }, // -----
    providers: { type: [Object], required: true }, // -----
    frameColor: { type: [Object], required: true }, // { nameFa, nameEn, color, isAvailable }
    isAvailable: { type: Boolean },
    isOriginal: { type: Boolean },
    isSpecialSale: { type: Boolean },
    isFreeDelivery: { type: Boolean },
    testAtHome: { type: Boolean },
    model: { type: String },
    category: { type: String },
    originCountry: { type: String },
    dimensions: { type: String },
    description: { type: String },
    frameMaterial: { type: String },
    frameType: { type: String },
    frameColorType: { type: String },
    lensMaterial: { type: String },
    lensColor: { type: String },
    lensFeature: { type: String },
    stars: { type: Number },
    discountPercent: { type: Number },
    discountedPrice: { type: Number },
    features: { type: [String] },
    frameShape: { type: [String] },
    faceShape: { type: [String] },
    comments: { type: [Object] },
  },
  { timestamps: true, collection: "products" }
);

const Prouct = mongoose.model("Product", productSchema);

module.exports = Prouct;
