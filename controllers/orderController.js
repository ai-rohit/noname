const { CustomError } = require("../helpers");
const {Order, OrderDetail} = require("../models");

module.exports = {
    getAllOrders :async (req,res,next)=>{
        let orders = await Order.find();
        console.log(orders)
        orders = orders.map(async (item) => {
            const productDetails = await OrderDetail.find({
                order: item._id
            }, ["-order"]).populate({path: "product", select: ["title", "materialUsed", "image", "size", "usedWeight", "extraCharge"], populate:"materialUsed"})
            return {
                ...item._doc,
                productDetails
            }
        })

        return res.status(200).send(await Promise.all(orders))
    },
    createOrder:async(req,res,next)=>{
        const {deliveryLocation, products, total, phoneNumber} = req.body;
        // produt={
        //     id:<id>,
        //     quantity:num,
        // }
        // const session = await Order.startSession();
        
        /**
         * {
         *  "deliveryLocation":"Newroad",
         *  "products": [
         *      {
         *          "id":"",
         *          "quantity":2
         *      }
         *  ],
         * "total":"",
         * "phoneNumber":""
         * }
         * [
         *  {
         *  id:
         *  quantity:
         * },{
         *  id:
         *  quantity:
         * }
         * ]
         */
        try{
            const order = new Order({
                deliveryLocation:deliveryLocation,
                phoneNumber: phoneNumber,
                total:total
            });
            await order.save();
            for(let i = 0; i<products.length; i++){
                const newOrder = {
                    order: order._id,
                    product:products[i].id,
                    quantity:products[i].quantity
                }
                const orderDetail = new OrderDetail(newOrder);
                await orderDetail.save();
            }
            return res.status(200).json(order);
            // await session.commitTransaction();
            // session.endSession();
        }catch(ex){
            // await session.abortTransaction();
            // session.endSession();
            next(new CustomError(ex.message, 500))
        }
    },
    getMyOrders: async(req, res, next)=>{
        const orders = await Order.find({user:req.user._id}).populate("items");
        return res.status(200).json({
            status:"success",
            data:{
                orders
            }
        })
    }
}