const Notification = require("../models/notification");

module.exports = {
    getNotificationForUser: async (req, res, next)=>{
        const notifications = await Notification.find({$or:[{user:req.user._id}, {type:"global"}]});
        return res.status(200).json({
            status:"success",
            data:{
                notifications
            }
        });
    }
}