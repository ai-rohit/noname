const express  = require("express");
const app = express();
const fs = require('fs');
const path = require("path");

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

const prodImagePath = path.join(__dirname + "/uploads");

if(!fs.existsSync(prodImagePath)){
  fs.mkdirSync(prodImagePath);
  console.log("created directory ", prodImagePath, " for images")
}

app.use("/uploads", express.static(prodImagePath))

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