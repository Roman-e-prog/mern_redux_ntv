const mongoose = require("mongoose");

const DaylinksSchema = new mongoose.Schema({
    ident:{type:String, required:true},
    cloudinary_id: {type:String, required:true},
    img:{type:String, required:true},
    title:{type:String, required:true},
    content:{type:String, required:true},
}, 
    {timestamps:true},
);

module.exports = mongoose.model("Daylinks", DaylinksSchema);