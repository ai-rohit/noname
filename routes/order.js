const express = require("express");
const orderController = require("../controllers/orderController");
const wrapAsync = require("../helpers/wrapAsync");
const loggedInUser = require("../middlewares/loggedInUser");
const router = express.Router();

router.get("/", wrapAsync(orderController.getAllOrders));
router.get("/my-orders", loggedInUser, wrapAsync(orderController.getMyOrders));

router.post("/", loggedInUser, wrapAsync(orderController.createOrder));

module.exports = router;