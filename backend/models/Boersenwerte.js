const mongoose = require("mongoose");

const BoersenwerteSchema = new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    value:{type:Number, required:true},
    up:{type:String, required:true},
},
    {timestamps:true}
);

module.exports = mongoose.model("Boersenwerte", BoersenwerteSchema);