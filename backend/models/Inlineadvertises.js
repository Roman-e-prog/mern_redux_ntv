const mongoose = require("mongoose");

const InlineadvertisesSchema = new mongoose.Schema({
    img:{type:String, required:true},
    cloudinary_id:{type:String, required:true},
    adv:{type:String, required:true, default:"Anzeige"},
    theme:{type:String, required:true},
    title:{type:String, required:true},
    content:{type:String, required:true},
    clicked:{type:Number, default:0},
}, 
    {timestamps:true},
);

module.exports = mongoose.model("Inlineadvertises", InlineadvertisesSchema);