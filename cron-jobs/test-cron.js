const cron = require("node-cron");
const {Notification} = require("../models")

module.exports = cron.schedule("*/2 * * * * *", async ()=>{
    const notifications = await Notification.find();
    if(notifications.length>0){
        try{
            let x = await Notification.findOne({}).sort({createdAt: -1});
            await x.remove();
            console.log("removed notification with id", x._id);
        }catch(ex){
            console.log(ex);
            console.log("failed")
        }
    }
    // console.log("no notification to remove")
})