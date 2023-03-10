const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    brand: { type: Schema.Types.ObjectId, required: true },
    sellers: { type: [Schema.Types.ObjectId], required: true }, // -----
    isAvailable: { type: Boolean, required: true },
    nameFa: {  type: String, required: true, maxLength: 200, unique: true },
    nameEn: { type: String, required: true, maxLength: 200, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    numberOfProducts: { type: Number, required: true },
    genders: { type: [String], required: true },
    sizes: { type: [String], required: true },
    images: { type: [Object], required: true }, // -----
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
    lensVisionColor : { type: String },
    stars: { type: Number, default: 0 },
    discountPercent: { type: Number, default: 0 },
    discountedPrice: { type: Number, default: 0 },
    numberOfVisits: { type: Number, default: 0 },
    discountTime: { type: Date },
    features: { type: [String], default: [] },
    frameShapes: { type: [String], default: [] },
    faceShapes: { type: [String], default: [] },
    lensFeatures: { type: [String], default: [] },
    comments: { type: [Schema.Types.ObjectId], default: [] },
  },
  { timestamps: true, collection: "products" }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
