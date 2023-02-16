const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    totalPrice: { type: Number, required: true },
    trackingCode: { type: Number, required: true },
    paymentStatus: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    sendingStatus: { type: String, required: true },
    sendingMethod: { type: String, required: true },
    address: { type: Object, required: true },
    products: { type: [Object], required: true },
  },
  { timestamps: true, collection: "orders" }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
