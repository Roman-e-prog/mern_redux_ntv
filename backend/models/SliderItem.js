const mongoose = require("mongoose");

const SliderItemSchema = new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    body:{type:String, required:true, unique:true},
}, 
    {timestamps:true},
);

module.exports = mongoose.model("SliderItem", SliderItemSchema);