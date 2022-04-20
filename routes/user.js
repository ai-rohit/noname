const express = require("express");
const { userController } = require("../controllers");
const loggedInUser = require("../middlewares/loggedInUser");
const router = express.Router();
const wrapAsync = require("../helpers/wrapAsync");

router.get("/", wrapAsync(userController.getUsers))
router.get("/me", loggedInUser, userController.getProfile);

module.exports = router;