const express = require("express");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/", userController.user_index);
userRouter.post("/", userController.add_user);

module.exports = userRouter;
