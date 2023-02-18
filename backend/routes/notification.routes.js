const notificationController = require("../controllers/notification.controller");
const express = require("express");

const notificationRouter = express.Router();

notificationRouter.post("/", notificationController.add_notification);

module.exports = notificationRouter;
