const {param, body, query} = require("express-validator");
const {User, Product} =  require("../models");

module.exports = {

    validateBookData: function(){
        return[
            body("title").notEmpty().withMessage("Title is required"),
            body("description").notEmpty().withMessage("Description is required"),
            body("price").notEmpty().withMessage("Price is required").isNumeric().withMessage("Price must be a number"),
            body("trackStock").optional().isBoolean().withMessage("Track stock must be a boolean").custom((value,{req})=>{
                if(value===true){
                    if(req.body.inStock){
                        return Promise.resolve();
                    }else{
                        return Promise.reject("To use track stock feature, You must provide stock amount");
                    }
                }
                return Promise.resolve();
            }),
            body("inStock").optional().isNumeric().withMessage("Stock amount must be a number").custom((value,{req})=>{
                if(value){
                    if(req.body.trackStock){
                        return Promise.resolve();
                    }else{
                        return Promise.reject("To use stock amount feature, You must provide track stock");
                    }
                }
                return Promise.resolve();
            }),
            body("condition").notEmpty().withMessage("Please provide a condition for the stock"),
            body("status").optional().custom(value=>{
                if(["published","unpublished","archived"].includes(value)){
                    return Promise.resolve();
                }
                return Promise.reject("Status value unmatched")
            })

        ]
    },

    userBookValidator: function(){
        return [
            param("postedBy").custom(async (value,{req})=>{
                const isUserPresent = await User.userWithIdPresent(value);
                if(isUserPresent){
                    req.userBooks = await Book.find({postedBy:value});
                    return Promise.resolve();
                }
                return Promise.reject("User with the id doesnt exist")
            })
        ]
    },
    bookIdValidator: function(){
        return [
            param("id").custom(async(value, {req})=>{
                const product = await Product.findById(value);
                if(!product){
                    return Promise.reject("Product with given id doesnt exist");
                }
                req.product = product;
                return Promise.resolve();
            })
        ]
    }
}