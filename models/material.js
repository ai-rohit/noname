const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  unitType: {
    type: String,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true
  }
});

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;