const {body, param} = require("express-validator");
const {User} = require("../models");

function validateNotificationBody(){
    return [
        body("receiver").optional().custom(async(value)=>{
            const validId = await User.userWithIdPresent(value);
            if(!validId){
                return Promise.reject("User doesn't exist");
            }
            // console.log(req.body.type);
            // if(req.body.type=="specific"){
            //     if(!value){
            //         return Promise.reject("Need to specify receiver for specific notification");
            //     }
            //     return Promise.resolve();
            // }
            return Promise.resolve();
        }),
        body("type").not().isEmpty().custom(async(value,{req})=>{
            if(["global", "specific"].indexOf(value)==-1){
                return Promise.reject("The value must be specific or global");
            }
            if((value=="global") && req.body.receiver){
                return Promise.reject("Cant specify receiver for global notification");
            }
            if((value=="specific")&& !req.body.receiver){
                return Promise.reject("Need to specify receiver for specific notification");
                
            }
            return Promise.resolve();
        }),
        body("title").not().isEmpty().isString().withMessage("Title must be string"),
        body("text").not().isEmpty().isString().withMessage("Title must be string"),
        body("sender").optional().custom(async(value, {req})=>{
            const validId = await User.userWithIdPresent(value);
            if(!validId){
                return Pomise.reject("User doesn't exist");
            }
            return Promise.resolve();
        }),
    ]
}

module.exports = {
    validateNotificationBody
}