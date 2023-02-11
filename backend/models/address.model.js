const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    province: { type: String, maxLength: 30, required: true },
    city: { type: String, maxLength: 30, required: true },
    plaque: { type: String, maxLength: 10, required: true },
    postalAddress: { type: String, required: true },
    postalCode: { type: String, maxLength: 12, required: true },
    isReceiver: { type: Boolean },
    receiverSpecifications: {
        firstName: { type: String, maxLength: 50 },
        lastName: { type: String, maxLength: 50 },
        phoneNumber: { type: String, maxLength: 15 },
    },
    unit: { type: String, maxLength: 5 },
  },
  { timestamps: true, collection: "addresses" }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
