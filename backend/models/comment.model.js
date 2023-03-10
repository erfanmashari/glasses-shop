const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true },
    product: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, maxLength: 80, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true }, // در حال بررسی - تایید شده- رد شده
    stars: { type: Number, required: true }, // 1 - 2 - 3 - 4 - 5
    isUnknown: { type: Boolean, default: false },
    positivePoints: { type: [String] },
    negativePoints: { type: [String] },
  },
  { timestamps: true, collection: "comments" }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
