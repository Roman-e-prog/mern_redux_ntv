const mongoose = require("mongoose");

const VideosSchema = new mongoose.Schema({
    src:{type:String, required:true},
    cloudinary_id:{type:String, required:true},
    ressort:{type:String, required:true},
    theme:{type:String, required:true},
    title:{type:String, required:true},
    clicked:{type:Number, default:0},
}, 
    {timestamps:true},
);

module.exports = mongoose.model("Videos", VideosSchema);