const mongoose = require("mongoose");

const notificationSchema  = new mongoose.Schema({
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    type:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;