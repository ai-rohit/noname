const { CustomError } = require("../helpers");
const {Product, Material} = require("../models");

module.exports = {
    getProducts : async(req, res, next)=>{
        const query = await Product.buildFilterQuery(req);
        console.log(query);
        const product = await Product.find(query).populate("materials");
        return res.send(product);
    },
    postProducts: async(req,res,next)=>{
        const {title, description, materialUsed, usedWeight, extraCharge, category, size} = req.body;
        let materialCharge = 0;    
        let material = await Material.findById(materialUsed);
        materialCharge = materialCharge + (material.unitPrice * usedWeight)

        let totalPrice = materialCharge + parseInt(extraCharge);
        const newProduct = await Product.create({
            title,
            description,
            materialUsed,
            usedWeight,
            category,
            totalPrice,
            extraCharge,
            size
        });
        return res.status(200).send(
                newProduct
        )
    },
    booksByUser: async(req,res,next)=>{
        return res.status(200).json(req.userBooks);
    },
    getSingleProduct: async(req,res,next)=>{
        return res.status(200).send(   
            req.product
        )
    },
    editProduct: async(req, res, next)=>{
        if(req.body.title){
            req.product.title = req.body.title
        }
        if(req.body.description){
            req.product.description = req.body.description
        }
        if(req.body.trackStock){
            req.product.trackStock = req.body.trackStock
        }
        if(req.body.inStock){
            req.product.inStock = req.body.inStock
        }
        if(req.body.size){
            req.product.size = req.body.size
        }
        const editedResult = await req.product.save();
        return res.status(200).json(editedResult)
    },
    deleteProduct: async(req, res, next)=>{
        await req.product.remove();
        return res.status(200).json({
            status:"success",
            message:"Product deleted successfully"
        });
    },
    myBooks: async(req, res, next)=>{
        const myBooks = await Product.find({postedBy: req.user._id}).populate("postedBy", {password:0});
        return res.status(200).json({
            status:"success",
            data:{
                books:myBooks
            }
        });
    },
    updateImage: async(req, res, next)=>{
        if(!req.file){
            return next(new CustomError("Image is required", 400))
        }
        req.product.image = req.file.path;
        await req.product.save();
        return res.status(200).json(req.product)
    }
}