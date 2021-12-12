const { Category } = require("../models");

module.exports = {
    getCategories : async(req, res, next)=>{
        const categories = await Category.find();
        return res.status(200).send({
            status:"success",
            data:{
                categories
            }
        })
    },
    postCategories: async(req, res,next)=>{
        const {name, description} = req.body;
        const cat = await Category.create({name, description});
        return res.status(200).send({
            status:"success",
            data:{
                category:cat
            }
        })
    },
    editCategory:  async(req,res, next)=>{
        const {name, description} = req.body;
        if(name){
            req.category.name = name;
        }
        if(description){
            req.category.description = description;
        }
        const category = await req.category.save();
        return res.status(200).send({
            status:"success",
            data:{
                category
            }
        })
    },
    getSingleCategory :(req, res, next)=>{
        return res.status(200).send({
            status:"success",
            data:{
                category: req.category
            }
        })
    },
    deleteCategory: async(req,res,next)=>{
        await req.category.remove();
        return res.status(200).send({
            status:"success",
            data:null
        })
    }
};