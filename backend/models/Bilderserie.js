const mongoose = require("mongoose");

const BilderserieSchema = new mongoose.Schema({

            img:{type:String, required:true},
            cloudinary_id: {type:String, required:true},
            alt:{type:String, required:true},
            title:{type:String, required:true},
            content:{type:String, required:true},
}, 
    {timestamps:true},
);

module.exports = mongoose.model("Bilderserie", BilderserieSchema);