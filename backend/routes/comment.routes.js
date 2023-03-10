const commentController = require("../controllers/comment.controller");
const express = require("express");

const commentRouter = express.Router();

commentRouter.post("/", commentController.add_comment);
commentRouter.delete("/", commentController.delete_comment);

module.exports = commentRouter;
