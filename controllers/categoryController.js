const { Category } = require("../models");
const { CustomError } = require("../helpers")

module.exports = {
    getCategories : async(req, res, next)=>{
        const categories = await Category.find();
        return res.status(200).send(categories);
    },
    postCategories: async(req, res,next)=>{
        const {name, description} = req.body;
        const category = await Category.findOne({
            name: name
        })

        if(category){
            return next(new CustomError("Category name already in use", 400))
        }
        //{status:"fail", message:"Category name already in use"}
        const cat = await Category.create({name, description});
        return res.status(200).send(cat)
    },
    editCategory:  async(req,res, next)=>{
        const {name, description} = req.body;
        if(name){
            const category = await Category.findOne({
                name: name
            })
            if(category){
                return next(new CustomError("Category name already in use", 400))
            }
            req.category.name = name;
        }
        if(description){
            req.category.description = description;
        }
        const category = await req.category.save();
        return res.status(200).send(category)
    },
    getSingleCategory :(req, res, next)=>{
        return res.status(200).send(req.category)
    },
    deleteCategory: async(req,res,next)=>{
        await req.category.remove();
        return res.status(200).send({
            data:null
        })
    }
};