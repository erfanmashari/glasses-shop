const express = require("express");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/", userController.user_index);
userRouter.get("/edit", userController.edit_personal_info);
userRouter.get("/:phoneNumber", userController.user_index_phone_number);

module.exports = userRouter;
