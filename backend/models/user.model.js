const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, maxLength: 50, required: true },
    lastName: { type: String, maxLength: 50, required: true },
    username: { type: String, maxLength: 80, required: true },
    gender: { type: String, maxLength: 10, required: true },
    phoneNumber: { type: String, unique: true, maxLength: 15, required: true },
    rules: { type: Boolean },
    active: { type: Boolean, default: true },
    job: { type: String, maxLength: 60 },
    email: { type: String, default: null, index: { unique: true, sparse: true } },
    password: { type: String },
    birthday: { type: Date },
    addresses: { type: [Object], default: [] },
    cart: { type: [Object], default: [] },
    purchaseHistory: { type: [Object], default: [] },
    favoriteProducts: { type: [Object], default: [] },
    comments: { type: [Object], default: [] },
    notifications: { type: [Object], default: [] },
  },
  { timestamps: true, collection: "users" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
