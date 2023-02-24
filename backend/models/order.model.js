const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    address: { type: Schema.Types.ObjectId, required: true },
    totalPrice: { type: Number, required: true },
    trackingCode: { type: Number, required: true, unique: true },
    status: { type: String, required: true }, // جاری - بسته بندی - ارسال شده - مرجوع شده - لغو شده
    paymentMethod: { type: String, required: true }, // زرین پال
    sendingMethod: { type: String, required: true }, // پست پیشتاز
    transaction: { type: Schema.Types.ObjectId },
    products: { type: [Object], required: true },
  },
  { timestamps: true, collection: "orders" }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
