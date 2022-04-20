const { User } = require("../models")

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
    }
}