const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    // images:[
    //     {
    //         id:{
    //             type: mongoose.Schema.Types.ObjectId,
    //         },
    //         path:{
    //             type: String,
    //             required: true
    //         }
    //     }
    // ],
    condition:{
        type: String,
        required: true
    },
    isSold:{
        type: Boolean,
        default: false
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    dateAdded:{
        type: Date,
        required: true
    },
});

bookSchema.statics.buildFilterQuery = function(req){
    let query = {};
    if(req.query.title){
        query.title= {$regex:new RegExp(req.query.title)};
    }
    if(req.query.minPrice && !req.query.maxPrice){
        query.price = {$gte: req.query.minPrice}
    }
    if(req.query.maxPrice && !req.query.minPrice){
        query.price = {$lte:req.query.maxPrice}
    }
    if(req.query.minPrice && req.query.maxPrice){
        query.price = {
            $gte:req.query.minPrice,
            $lte:req.query.maxPrice
        }
    }
    return {$and:[query]};
}

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;