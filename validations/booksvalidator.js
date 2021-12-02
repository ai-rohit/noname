const {param, body, query} = require("express-validator");
const {User, Book} =  require("../models");

module.exports = {
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
            param("bookId").custom(async(value, {req})=>{
                const book = await Book.findById(value);
                if(!book){
                    return Promise.reject("Book with given id doesnt exist");
                }
                req.book = book;
                return Promise.resolve();
            })
        ]
    }
}