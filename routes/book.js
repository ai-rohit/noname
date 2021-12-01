const express = require("express");
const {bookController} = require("../controllers");
const {wrapAsync} = require("../helpers")

const router = express.Router();

router.get("/all", wrapAsync(bookController.getAllBooks));

module.exports = router;