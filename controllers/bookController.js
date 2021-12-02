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
        return res.status(200).json({
            status:"success",
            data:{
                books:req.userBooks
            }
        })
    },
    getSingleBook: async(req,res,next)=>{
        return res.status(200).send({
            status:"success",
            data:{
                book:req.book
            }
        })
    },
    editBook: async(req, res, next)=>{
        if(req.body.title){
            req.book.title = req.body.title
        }
        if(req.body.description){
            req.book.description = req.body.description
        }
        if(req.body.trackStock){
            req.book.trackStock = req.body.trackStock
        }
        if(req.body.inStock){
            req.book.inStock = req.body.inStock
        }
        if(req.body.isSold){
            req.book.isSold = req.body.isSold
        }
        if(req.body.status){
            req.book.status = req.body.status
        }
        const editedResult = await req.book.save();
        return res.status(200).json({
            status:"success",
            data:{
                book:editedResult
            }
        })
    }
}