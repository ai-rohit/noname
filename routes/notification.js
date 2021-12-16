const notificationController = require("../controllers/notificationController");
const express = require("express");
const router = express.Router();
const loggedInUser = require("../middlewares/loggedInUser");
const wrapAsync = require("../helpers/wrapAsync");

router.get("/my", loggedInUser, wrapAsync(notificationController.getNotificationForUser));

module.exports = router;