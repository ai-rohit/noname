const {Book} = require("../models");

module.exports = {
    getAllBooks : async(req, res, next)=>{
        const book = await Book.find();
        return res.send({
            status:"success",
            data:{
                book
            }
        })
    },
    postBooks: async(req,res,next)=>{

    }
}