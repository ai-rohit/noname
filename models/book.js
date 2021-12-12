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
    category:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Category"
    },
    price:{
        type: Number,
        required: true
    },
    trackStock:{
        type:Boolean,
        default: false
    },
    inStock:{
        type:Number,
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
    images:{
        type:Array,
    },
    condition:{
        type: String,
        required: true
    },
    isSold:{
        type: Boolean,
        default: false
    },
    status:{
        type:String,
        enum:["published","unpublished","archived"],
        default:"published"
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    deliveryAvailable:{
        type:Boolean,
        default: false
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