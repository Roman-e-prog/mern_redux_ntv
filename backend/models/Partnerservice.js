const mongoose = require("mongoose");

const PartnerserviceSchema = new mongoose.Schema({
    title:{type:String, required:true},
    content:{type:[{type:String}], required:true},
}, 
    {timestamps:true},
);

module.exports = mongoose.model("Partnerservice", PartnerserviceSchema);