const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    address: { type: Schema.Types.ObjectId, required: true },
    products: { type: [Schema.Types.ObjectId], required: true },
    totalPrice: { type: Number, required: true },
    trackingCode: { type: Number, required: true, unique: true },
    paymentStatus: { type: String, required: true }, // unpaid - paid 
    paymentMethod: { type: String, required: true }, // zarinpal
    sendingStatus: { type: String, required: true }, // packing - posted
    sendingMethod: { type: String, required: true }, // express mail
  },
  { timestamps: true, collection: "orders" }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
