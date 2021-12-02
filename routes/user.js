const express = require("express");
const { userController } = require("../controllers");
const loggedInUser = require("../middlewares/loggedInUser");
const router = express.Router();

router.get("/me", loggedInUser, userController.getProfile);

module.exports = router;