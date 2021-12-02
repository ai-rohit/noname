module.exports = {
    getProfile : (req,res,next)=>{
        return res.status(200).json({
            status:"success",
            data:{
                user:req.user
            }
        })
    }
}