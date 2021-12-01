const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type:"String",
        required: true
    },
    email: {
        type:"String",
        required: true
    },
    password: {
        type:"String",
    },
    isVerified: {
        type:"Boolean",
        default: false
    },
    passwordChangedAt: Date
});

userSchema.methods.changedPassword = function(timestamp){
    if(this.passwordChangedAt){
        let formattedTimeStamp = parseInt(this.passwordChanged.getTime()/1000,10);
        return formattedTimeStamp > timestamp;
    }    
    return false;
}

const User = mongoose.model("User", userSchema);

module.exports = User;