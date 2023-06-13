const mongoose = require("mongoose");

const DropdownBoerseSchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true, default: "Börse"},
    lis:{type:[{type:String}], required:true,},
    videos: [
        {
            iframe: {type:String, required:true,},
            cloudinary_id: {type:String, required:true,},
            ressort:{type:String, required:true,},
            theme:{type:String, required:true,},
            title:{type:String, required:true,},
        },
        {
            iframe: {type:String, required:true,},
            cloudinary_id: {type:String, required:true,},
            ressort:{type:String, required:true,},
            theme:{type:String, required:true,},
            title:{type:String, required:true,},
        },
        {
            iframe: {type:String, required:true,},
            cloudinary_id: {type:String, required:true,},
            ressort:{type:String, required:true,},
            theme:{type:String, required:true,},
            title:{type:String, required:true,},
        }
    ],
    themen:{type:[{type:String}]},
},
    {timestamps:true},
);
module.exports = mongoose.model("DropdownBoerse", DropdownBoerseSchema);