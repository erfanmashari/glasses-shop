const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, maxLength: 50, required: true },
    lastName: { type: String, maxLength: 50, required: true },
    username: { type: String, maxLength: 80, unique: true, required: true },
    gender: { type: String, maxLength: 10, required: true },
    phoneNumber: { type: String, unique: true, maxLength: 15, required: true },
    rules: { type: Boolean },
    isActive: { type: Boolean, default: true },
    job: { type: String, maxLength: 60 },
    email: { type: String, default: null, index: { unique: true, sparse: true } },
    password: { type: String },
    birthday: { type: Date },
    addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
    cart: { type: [Schema.Types.ObjectId], default: [] },
    orders: { type: [Schema.Types.ObjectId], default: [] },
    favorites: { type: [Schema.Types.ObjectId], default: [] },
    comments: { type: [Schema.Types.ObjectId], default: [] },
    notifications: { type: [Schema.Types.ObjectId], default: [] },
  },
  { timestamps: true, collection: "users" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
