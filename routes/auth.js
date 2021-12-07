const {authController} = require('../controllers');
const {validatePasswordChange} = require("../validations/authValidator");
const {wrapAsync} = require('../helpers');
const validationResult = require("../middlewares/validationResult");

const express = require("express");
const loggedInUser = require('../middlewares/loggedInUser');
const router = express.Router();

router.post("/register", wrapAsync(authController.register));
router.post("/login", wrapAsync(authController.localLogin));
router.post("/change-password", [loggedInUser, validatePasswordChange(),validationResult], wrapAsync(authController.changePassword));

module.exports = router;