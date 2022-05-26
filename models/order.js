const mongoose = require("mongoose");
const { string } = require("sharp/lib/is");

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    deliveryLocation:{
       type: String,
       required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    status:{
        type:String,
        required:true,
        enum:["pending","accepted","rejected","delivering", "completed", "returned"],
        default:"pending"
    },
    paymentStatus:{
        type: String,
        required: true,
        enum: ["paid", "unpaid"],
        default: "unpaid"
    },
    paymentType:{
        type: string,
        required: true,
        default: "cash"
    },
    total:{
        type:Number,
        required:true
    }
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

const Order = mongoose.model("Order",orderSchema);
module.exports = Order;