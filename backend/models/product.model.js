const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    isAvailable: { type: Boolean, required: true },
    nameFa: {  type: String, required: true, maxLength: 200, unique: true },
    nameEn: { type: String, required: true, maxLength: 200, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    numberOfProducts: { type: Number, required: true },
    brand: { type: Object, required: true },
    genders: { type: [String], required: true },
    sizes: { type: [String], required: true },
    images: { type: [Object], required: true }, // -----
    providers: { type: [Object], required: true }, // -----
    frameColors: { type: [Object], required: true }, // { nameFa, nameEn, color, isAvailable }
    isOriginal: { type: Boolean, default: false },
    isSpecialSale: { type: Boolean, default: false },
    isFreeDelivery: { type: Boolean, default: false },
    testAtHome: { type: Boolean, default: false },
    model: { type: String },
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
    frameShapes: { type: [String], default: [] },
    faceShapes: { type: [String], default: [] },
    comments: { type: [Object], default: [] },
  },
  { timestamps: true, collection: "products" }
);

const Prouct = mongoose.model("Product", productSchema);

module.exports = Prouct;
