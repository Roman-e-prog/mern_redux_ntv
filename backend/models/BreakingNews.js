const mongoose = require("mongoose");

const BreakingNewsSchema = new mongoose.Schema({
    content:{type:String, required:true},
}, {timestamps:true});

module.exports = mongoose.model("BreakingNews", BreakingNewsSchema);