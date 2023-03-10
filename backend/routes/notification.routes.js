const notificationController = require("../controllers/notification.controller");
const express = require("express");

const notificationRouter = express.Router();

notificationRouter.post("/", notificationController.add_notification);
notificationRouter.put("/seen", notificationController.seen_notification);
notificationRouter.delete("/", notificationController.delete_notification);

module.exports = notificationRouter;
