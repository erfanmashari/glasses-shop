const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    province: { type: String, maxLength: 30, required: true },
    city: { type: String, maxLength: 30, required: true },
    plaque: { type: String, maxLength: 10, required: true },
    postalAddress: { type: String, required: true },
    postalCode: { type: String, maxLength: 12, required: true },
    isMeReceiver: { type: Boolean },
    receiverSpecifications: {
      firstName: { type: String, maxLength: 50, required: true },
      lastName: { type: String, maxLength: 50, required: true },
      phoneNumber: { type: String, maxLength: 15, required: true },
    },
    unit: { type: String, maxLength: 5 },
  },
  { timestamps: true, collection: "addresses" }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
