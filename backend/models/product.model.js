const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    nameFa: {  type: String, required: true, maxLength: 200, unique: true },
    nameEn: { type: String, required: true, maxLength: 200, unique: true },
    price: { type: Number, required: true },
    numberOfProducts: { type: Number, required: true },
    brand: { type: Object, required: true },
    gender: { type: [String], required: true, default: [] },
    size: { type: [String], required: true, default: [] },
    images: { type: [Object], required: true, default: [] }, // -----
    providers: { type: [Object], required: true, default: [] }, // -----
    frameColors: { type: [Object], required: true, default: [] }, // { nameFa, nameEn, color, isAvailable }
    isAvailable: { type: Boolean, default: true },
    isOriginal: { type: Boolean, default: false },
    isSpecialSale: { type: Boolean, default: false },
    isFreeDelivery: { type: Boolean, default: false },
    testAtHome: { type: Boolean, default: true },
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
    stars: { type: Number, default: 0 },
    discountPercent: { type: Number, default: 0 },
    discountedPrice: { type: Number, default: 0 },
    features: { type: [String], default: [] },
    frameShape: { type: [String], default: [] },
    faceShape: { type: [String], default: [] },
    comments: { type: [Object], default: [] },
  },
  { timestamps: true, collection: "products" }
);

const Prouct = mongoose.model("Product", productSchema);

module.exports = Prouct;
