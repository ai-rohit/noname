const express = require("express");
const {bookController} = require("../controllers");
const {wrapAsync} = require("../helpers");
const loggedInUser = require("../middlewares/loggedInUser");
const validationResult = require("../middlewares/validationResult");
const {userBookValidator} = require("../validations/booksvalidator");

const router = express.Router();

router.get("/",loggedInUser,wrapAsync(bookController.getBooks));
router.post("/", loggedInUser ,wrapAsync(bookController.postBooks));
// router.get("/:postedBy", wrapAsync(bookController.booksByUser));
const userBooksRouter = express.Router();
router.use("/:postedBy",userBookValidator(),validationResult,userBooksRouter);

userBooksRouter.get("/", bookController.booksByUser);

module.exports = router;