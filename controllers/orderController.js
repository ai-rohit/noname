const { CustomError } = require("../helpers");
const {Order, OrderDetail} = require("../models");

module.exports = {
    getAllOrders :async (req,res,next)=>{
        const orders = await Order.find();
        return res.status(200).send({
            status:"success",
            data:{
                orders
            }
        })
    },
    createOrder:async(req,res,next)=>{
        const {deliveryLocation, products} = req.body;
        // produt={
        //     id:<id>,
        //     quantity:num,
        // }
        const session = await Order.startSession();
        const order = new Order({
            deliveryLocation:{
                type:"Point",
                coordinates:[83.98535,28.22571]
            },
            user:req.user._id,
            total:1000
        });
        await order.save();
        try{
            for(let i = 0; i<products.length; i++){
                const newOrder = {
                    order: order._id,
                    product:products[i].id,
                    quantity:products[i].quantity
                }
                const orderDetail = new OrderDetail(newOrder);
                await orderDetail.save();
            }
            await session.commitTransaction();
            session.endSession();
        }catch(ex){
            await session.abortTransaction();
            session.endSession();
            next(new CustomError(ex.message, 500))
        }
    },
    getMyOrders: async(req, res, next)=>{
        const orders = await Order.find({user:req.user._id});
        return res.status(200).json({
            status:"success",
            data:{
                orders
            }
        })
    }
}