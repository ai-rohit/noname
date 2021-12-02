const {authController} = require('../controllers');
const {wrapAsync} = require('../helpers');

const express = require("express");
const router = express.Router();

router.post("/register", wrapAsync(authController.register));
router.post("/login", wrapAsync(authController.localLogin));


module.exports = router;