const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    materials:{
        type:[{
            material:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Material"
            },
            usedQuantity:{
                type: Number,
                required: true
            }
        }],
        required: true
    },
    extraCharge:{
        type: Number,
        required: true
    },
    totalPrice:{
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
    image: String,
}, {timestamps:true});

productSchema.statics.buildFilterQuery = function(req){
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

const Product = mongoose.model("Product", productSchema);

module.exports = Product;