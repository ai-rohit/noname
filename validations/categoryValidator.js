const {param} = require("express-validator");
const { Category } = require("../models");

function catIdValidator(){
    return [
        param("id").custom(async(value, {req})=>{
            const category = await Category.findById(value);
            if(!category){
                return Promise.reject("Category with id not found");
            }
            req.category = category;
            return Promise.resolve();
        })
    ]
}
module.exports = {
    catIdValidator
}