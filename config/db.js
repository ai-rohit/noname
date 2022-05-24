const mongoose = require("mongoose");

const dbString = "mongodb+srv://Jutsan:Jutsan2020@cluster0.9vra6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const db = mongoose.connect(dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected to database ", dbString);
}).catch(err=>{
    console.log(err);
})

module.exports = db;