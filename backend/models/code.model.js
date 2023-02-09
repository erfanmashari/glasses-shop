const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeSchema = new Schema(
  {
    code: { type: Number, required: true },
    type: { type: String, required: true },
    phoneNumber: { type: String },
    expiredAt: { type: Number, required: true },
    email: { type: String },
  },
  { timestamps: true, collection: "codes" }
);

codeSchema.index({ code: 1, type: 1, phoneNumber: 1 }, { unique: true });

const Code = mongoose.model("Code", codeSchema);

module.exports = Code;
