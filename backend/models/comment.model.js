const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    productId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, maxLength: 80, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true }, // در حال بررسی - تایید شده- رد شده
    stars: { type: Number, required: true }, // 1 - 2 - 3 - 4 - 5
    unknown: { type: Boolean, default: false },
    positivePoints: { type: [String] },
    negativePoints: { type: [String] },
  },
  { timestamps: true, collection: "comments" }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
