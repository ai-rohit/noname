const express = require("express");
const { userController } = require("../controllers");
const loggedInUser = require("../middlewares/loggedInUser");
const router = express.Router();
const wrapAsync = require("../helpers/wrapAsync");

const upload = require("../middlewares/multer")

router.get("/", wrapAsync(userController.getUsers))
router.get("/me", loggedInUser, userController.getProfile);
router.put("/me/image", upload.single("image"), loggedInUser, wrapAsync(userController.updateImage))

module.exports = router;