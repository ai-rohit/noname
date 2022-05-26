const { User } = require("../models")
const { CustomError } = require("../helpers");

module.exports = {
    getProfile : (req,res,next)=>{
        return res.status(200).json({
            status:"success",
            data:{
                user:req.user
            }
        })
    },

    getUsers: async(req, res, next)=>{
        const users = await User.find();
        return res.status(200).json(users);
    },

    updateImage: async(req, res, next)=>{
        if(!req.file){
            return next(new CustomError("Image is required", 400))
        }
        req.user.image = req.file.path.replace("\\", "/");
        req.user = await req.user.save();
        return res.status(200).json(req.user)
    }
}