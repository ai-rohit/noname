const express = require("express");
const {bookController} = require("../controllers");
const {wrapAsync} = require("../helpers");
const loggedInUser = require("../middlewares/loggedInUser");

const router = express.Router();

router.get("/",loggedInUser,wrapAsync(bookController.getBooks));
router.post("/", loggedInUser ,wrapAsync(bookController.postBooks));

module.exports = router;