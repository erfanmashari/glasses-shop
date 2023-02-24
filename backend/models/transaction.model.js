const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true },
    order: { type: Schema.Types.ObjectId, required: true, unique: true },
    amount: { type: Number, required: true },
    card: { type: Number, required: true },
    cvv2: { type: Number, required: true },
    secondPassword: { type: Number, required: true },
    trackingCode: { type: Number, required: true, unique: true },
    expireDate: { type: String, required: true },
  },
  { timestamps: true, collection: "orders" }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
