const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    isAvailable: { type: Boolean, required: true },
    nameFa: {  type: String, required: true, maxLength: 200, unique: true },
    nameEn: { type: String, required: true, maxLength: 200, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: Object, required: true },
    size: { type: String, required: true },
    image: { type: Object, required: true },
    seller: { type: Object, required: true },
    frameColor: { type: Object, required: true },
    isOriginal: { type: Boolean, default: false },
    isSpecialSale: { type: Boolean, default: false },
    isFreeDelivery: { type: Boolean, default: false },
    testAtHome: { type: Boolean, default: false },
    model: { type: String },
    discountPercent: { type: Number, default: 0 },
    discountedPrice: { type: Number, default: 0 },
    discountTime: { type: Date },
  },
  { timestamps: true, collection: "cart" }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
