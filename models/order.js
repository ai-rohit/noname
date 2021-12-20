const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    deliveryLocation:{
        type:{
            type:String,
            default:"Point"
        },
        coordinates:{
            type:[Number],
            index:"2dsphere"
        }

    },
    status:{
        type:String,
        required:true,
        enum:["pending","accepted","rejected","delivered"],
        default:"pending"
    },
    // total:{
    //     type:Number,
    //     required:true
    // }
    // orderNum:{
    //     type:String,
    //     required:"true",
    // }
    
},{timestamps:true,
toJSON: { virtuals: true },
toObject: { virtuals: true }});

orderSchema.virtual("items",{
    ref:"OrderDetail",
    localField:"_id",
    foreignField:"order"
})

orderSchema.virtual("total").get(function(){
    return this.orderDetails.reduce((total, orderDetail) => {
        return total + orderDetail.lineTotal;
    }, 0);
})

const Order = mongoose.model("Order",orderSchema);
module.exports = Order;