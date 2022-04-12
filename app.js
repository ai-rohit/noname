const express  = require("express");
const app = express();

require("dotenv").config();
require("./config/db");
const CustomError = require("./helpers/customErrorHandler");
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/book"));
app.use("/api/users", require("./routes/user"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/categories", require("./routes/category"));
app.use("/api/notifications", require("./routes/notification"));
app.use("/api/materials", require("./routes/material"));

app.use("*", async(req, res, next) => {
    next(new CustomError(`${req.originalUrl} not found`, 404));
});
require("./cron-jobs/test-cron")
app.use(require("./middlewares/errorhandler"));

const port = process.env.PORT || 8000;
 
const server = app.listen(port, (error)=>{
    if(error) console.log(error)
    console.log("listening to port", port);
});

module.exports = server;