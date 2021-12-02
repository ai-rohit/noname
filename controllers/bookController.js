const {Book} = require("../models");

module.exports = {
    getBooks : async(req, res, next)=>{
        const query = await Book.buildFilterQuery(req);
        console.log(query);
        const book = await Book.find(query).populate("postedBy", {password:0});
        return res.send({
            status:"success",
            data:{
                book
            }
        })
    },
    postBooks: async(req,res,next)=>{
        const {title, description, price, condition} = req.body;
        const newBook = await Book.create({
            title,
            description,
            price,
            condition,
            postedBy: req.user._id,
            dateAdded: new Date()
        });
        return res.status(200).send({
            status:"success",
            data:{
                book:newBook
            }
        })
    },
    booksByUser: async(req,res,next)=>{

    }
}