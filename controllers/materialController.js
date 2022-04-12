const {Material} = require("../models");
const {CustomError} = require("../helpers");

module.exports = {
  getMaterials: async(req, res, next)=>{
    const materials = await Material.find();
    return res.status(200).json({
      status:"success",
      data:{
        materials
      }
    })
  },
  addMaterial: async(req, res, next)=>{
    const {name, unitType, unitPrice} = req.body;
    let material = new Material({
      name,
      unitType,
      unitPrice
    });
    material = await material.save();
    return res.status(200).json({
      status:"success",
      data:{
        material
      }
    })
  },
  getSingleMaterial: async(req, res, next)=>{
    const material = await Material.findById(req.params.id);
    if(!material){
      return next(new CustomError("Cannot find the given material", 404))
    }

    return res.status(200).json({
      status:"success",
      data:{
        material
      }
    })
  },
  updateMaterial: async(req, res, next)=>{
    let material = await Material.findById(req.params.id);
    if(!material){
      return next(new CustomError("Cannot find the given material", 404))
    }
    const {name, unitType, unitPrice} = req.body;

    name? material.name = name: null;
    unitType? material.unitType = unitType: null;
    unitPrice? material.unitPrice = unitPrice: null;

    material = await material.save();

    return res.status(200).json({
      status:"success",
      data:{
        material
      }
    })
  },
  deleteMaterial: async(req, res, next)=>{
    let material = await Material.findById(req.params.id);
    if(!material){
      return next(new CustomError("Cannot find the given material", 404))
    }
    await material.remove();
    return res.status(200).json({
      status:"success",
      data: null
    })
  }
}