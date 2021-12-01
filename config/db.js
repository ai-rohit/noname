const mongoose = require("mongoose");

const db = mongoose.connect("mongodb://localhost/noname", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected to database");
}).catch(err=>{
    console.log(err);
})

module.exports = db;