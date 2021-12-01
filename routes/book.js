const express = require("express");
const {bookController} = require("../controllers");
const {wrapAsync} = require("../helpers");
const loggedInUser = require("../middlewares/loggedInUser");

const router = express.Router();

router.get("/all",loggedInUser,wrapAsync(bookController.getAllBooks));

module.exports = router;