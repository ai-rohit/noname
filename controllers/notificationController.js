const {Notification} = require("../models");

module.exports = {
    getNotificationForUser: async (req, res, next)=>{
        const notifications = await Notification.find({$or:[{user:req.user._id}, {type:"global"}]});
        return res.status(200).json({
            status:"success",
            data:{
                notifications
            }
        });
    },
    createNotification: async(req, res, next)=>{
        const newNotification = new Notification(req.body);
        await newNotification.save();
        return res.status(200).json({
            status:"success",
            data:{
                notification: newNotification
            }
        })
    }
}