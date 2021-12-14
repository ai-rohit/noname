const mongoose = require("mongoose");

const dbString = process.env.NODE_ENV=="test"?process.env.dbtest:process.env.db
const db = mongoose.connect(dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected to database ", dbString);
}).catch(err=>{
    console.log(err);
})

module.exports = db;