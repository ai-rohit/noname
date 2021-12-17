const {notificationController} = require("../controllers");
const express = require("express");
const router = express.Router();
const loggedInUser = require("../middlewares/loggedInUser");
const wrapAsync = require("../helpers/wrapAsync");
const {validateNotificationBody} = require("../validations/notificationValidator");
const validationResult = require("../middlewares/validationResult");

router.post("/", validateNotificationBody(), validationResult, wrapAsync(notificationController.createNotification));
router.get("/my", loggedInUser, wrapAsync(notificationController.getNotificationForUser));

module.exports = router;