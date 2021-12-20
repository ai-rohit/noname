const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type:"String",
        required: true
    },
    email: {
        type:"String",
        required: true
    },
    phone:{
        type:Number,
    },
    password: {
        type:"String",
    },
    isVerified: {
        type:"Boolean",
        default: false
    },
    role:{
        type:String,
        required:true,
        default:"user",
        enum:["user","admin"]
    },
    userType:{
        type:String,
        enum:["local","google","facebook"]
    },
    resetToken:{
        token:{
            type:Number,
            maxlength:4,
            minlength:4
        },
        expires:{
            type:Date,
            default: Date.now() + 3600000
        }
    },
    verificationToken:{
        token:{
            type:Number,
            maxlength:4,
            minlength:4
        },
        expires:{
            type:Date,
            default: Date.now() + 3600000
        }
    },
    passwordChangedAt: Date
}, {timestamps: true});
userSchema.methods.comparePassword = async function(candidatePassword){
    console.log(this.password, candidatePassword);
    console.log(bcrypt.compareSync(candidatePassword, this.password));
    if(bcrypt.compareSync(candidatePassword, this.password)){
       return true; 
    }
    return false;
}
userSchema.methods.changedPassword = function(timestamp){
    if(this.passwordChangedAt){
        let formattedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
        return formattedTimeStamp > timestamp;
    }    
    return false;
}

userSchema.statics.userWithIdPresent = async function(userId){
    const user = await User.findById(userId);
    if(!user){
        return false;
    }
    return true;
}

const User = mongoose.model("User", userSchema);

module.exports = User;