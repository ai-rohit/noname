const express = require("express");
const orderController = require("../controllers/orderController");
const wrapAsync = require("../helpers/wrapAsync");
const router = express.Router();

router.get("/", wrapAsync(orderController.getAllOrders));

module.exports = router;