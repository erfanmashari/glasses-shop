const express = require("express");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/", userController.user_index);
userRouter.get("/:id", userController.user_index_id);

module.exports = userRouter;
