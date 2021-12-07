const {User} = require("../models");
const bcrypt = require("bcrypt");
const {jwt, CustomError} = require("../helpers");

module.exports = {
    register : async(req,res,next)=>{
            const {name, email, password} = req.body;
            const user = await User.findOne({email});
            if(user){
                return next(new CustomError("User already exists",400));
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            User.create({
                name,
                email,
                password: hashedPassword
            }, (error, result)=>{
                if(error){
                    next(error);
                }else{
                    console.log(result);
                    return res.status(200).json({
                        status:"success",
                        data:{
                            user:{}
                        }
                    })
                }
            })
    },
    localLogin : async(req, res, next)=>{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return next(new CustomError("Username or password doesn't match",400));
        }
        console.log(user);
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
            return next(new CustomError("Username or password doesn't match", 400));
        }else{
            const token = jwt.signJwt({userId:user._id});
            return res.status(200).send({
                status:"success",
                data:{
                    token
                }
            });
        }
    },
    googleLogin : async(req, res, next)=>{
        
    },
    changePassword: async(req, res, next)=>{
        // takes current pw, new pw, new pw confirm
        const {currentPassword, newPassword} = req.body;
        const isMatch = await req.user.comparePassword(currentPassword);
        if(isMatch){
            req.user.password = bcrypt.hashSync(newPassword, 10);
            req.user.passwordChangedAt = Date.now();
            await req.user.save();
            return res.status(200).send({
                status:"success",
                data:{
                    password:"Password changed successfully"
                }
            })
        }
        next(new CustomError("Password doesn't match", 400));
    }
}