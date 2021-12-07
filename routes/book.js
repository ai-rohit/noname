const express = require("express");
const {bookController} = require("../controllers");
const {wrapAsync} = require("../helpers");
const loggedInUser = require("../middlewares/loggedInUser");
const validationResult = require("../middlewares/validationResult");
const {userBookValidator, bookIdValidator} = require("../validations/booksvalidator");

const router = express.Router();

router.get("/",loggedInUser,wrapAsync(bookController.getBooks));
router.get("/my-books", loggedInUser, wrapAsync(bookController.myBooks));
router.post("/", loggedInUser ,wrapAsync(bookController.postBooks));

//routes for single books
const singleBookRouter = new express.Router();
router.use("/:bookId", bookIdValidator(), validationResult, singleBookRouter);
singleBookRouter.get("/", bookController.getSingleBook);
singleBookRouter.put("/", wrapAsync(bookController.editBook));
singleBookRouter.delete("/", wrapAsync(bookController.deleteBook));

//routes for books by a user
const userBooksRouter = new express.Router();
router.use("/:postedBy",userBookValidator(),validationResult,userBooksRouter);
userBooksRouter.get("/", bookController.booksByUser);

module.exports = router;