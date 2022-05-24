const mongoose = require("mongoose");
const Material = require("./material");

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
    size:{
        type: String
    },
    materialUsed:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Material",
        required: true
    },
    usedWeight:{
        type: Number
    },
    extraCharge:{
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
}, {timestamps:true, toJSON:{virtuals: true}});

// productSchema.virtual("totalPrice").set(async function(){
//     const material = await Material.findById(this.materialUsed);
//     let priceWithMaterial = this.usedWeight * material.unitPrice;
//     let totalCharge = priceWithMaterial + this.extraCharge;
//     this.totalPrice = totalCharge;
// }).get(function(){
//     // return Material.findById(this.materialUsed).then((material)=>{
//         //     if(material){
//             //          priceWithMaterial = this.usedWeight * parseInt(material.unitPrice);
//             //     }
//             //         let totalCharge = priceWithMaterial + this.extraCharge
//             //         return totalCharge;
//             // }).catch(err=>{
//                 //     console.log(err)
//                 // });
                
//     // const price = Material.findById(this.materialUsed, (err, material)=>{
//     //     let priceWithMaterial = 0;
//     //     if(err){
//     //         console.log(err)
//     //     }
//     //     if(material){
//     //         priceWithMaterial = this.usedWeight * parseInt(material.unitPrice);
//     //    }
//     //        let totalCharge = priceWithMaterial + this.extraCharge
//     //        return totalCharge;
//     // });
//     // return price;
//     return this.totalPrice
// })

// productSchema.methods.getTotalCharge = function(){
//     const material = await Material.findById(this.materialUsed);
//     let priceWithMaterial = this.usedWeight * material.unitPrice;
//     let totalCharge = priceWithMaterial + this.extraCharge;
    
    
// }

productSchema.method("totalPrice", async function(){
    const material = await Material.findById(this.materialUsed);
    let priceWithMaterial = this.usedWeight * material.unitPrice;
    let totalCharge = priceWithMaterial + this.extraCharge;
    return totalCharge
})

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
    if(req.query.category){
        query.category = req.query.category
    }
    return {$and:[query]};
}

const Product = mongoose.model("Product", productSchema);

module.exports = Product;