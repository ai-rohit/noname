const express = require("express");
const {bookController} = require("../controllers");
const {wrapAsync} = require("../helpers");
const loggedInUser = require("../middlewares/loggedInUser");
const validationResult = require("../middlewares/validationResult");
const {userBookValidator, bookIdValidator} = require("../validations/booksvalidator");

const router = express.Router();

router.get("/",loggedInUser,wrapAsync(bookController.getBooks));
router.post("/", loggedInUser ,wrapAsync(bookController.postBooks));
// router.get("/:postedBy", wrapAsync(bookController.booksByUser));
const singleBookRouter = new express.Router();
router.use("/:bookId", bookIdValidator(), validationResult, singleBookRouter);
singleBookRouter.get("/", bookController.getSingleBook);
singleBookRouter.put("/", wrapAsync(bookController.editBook));

const userBooksRouter = new express.Router();
router.use("/:postedBy",userBookValidator(),validationResult,userBooksRouter);

userBooksRouter.get("/", bookController.booksByUser);

module.exports = router;