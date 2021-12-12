const express = require("express");
const { categoryController } = require("../controllers");
const { wrapAsync } = require("../helpers");
const validationResult = require("../middlewares/validationResult");
const {catIdValidator} = require("../validations/categoryValidator");

const router = express.Router();

router.get("/", wrapAsync(categoryController.getCategories));
router.post("/", wrapAsync(categoryController.postCategories));

const singleCategory = new express.Router();

router.use("/:id", catIdValidator(),validationResult,singleCategory);

singleCategory.get("/", categoryController.getSingleCategory);
singleCategory.put("/", wrapAsync(categoryController.editCategory));
singleCategory.delete("/", wrapAsync(categoryController.deleteCategory));
module.exports = router;