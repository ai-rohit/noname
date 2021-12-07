const {body} = require("express-validator");

const validatePasswordChange = function(){
    return [
        body("newPassword").notEmpty().withMessage("New password is required").isLength({min:8, max:16}).withMessage("Password length must be between 8 to 16 characters"),
        body("newConfirmPassword").notEmpty().withMessage("Please provide a confirm password").isLength({min:8, max:16}).withMessage("Password length must be between 8 to 16 characters").custom((value, {req})=>{
            if(value!==req.body.newPassword){
                return Promise.reject("Password and confrim password doesn't match");
            }
            return Promise.resolve();
        })
    ];
}

module.exports = {
    validatePasswordChange
}