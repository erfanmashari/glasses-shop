const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true, collection: "notifications" }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
