const mongoose = require('mongoose');

const UserLetterSchema = new mongoose.Schema({
    sendUserId:{type:String, required:true},
    sendUserName:{type:String, required:true},
    commentTheme:{type:String, required:true},
    userAnswer:{type:String, required:true},
    likes:{type:Number, default:0},
    disLikes:{type:Number, default:0},
},{timestamps:true});

module.exports = mongoose.model("UserLetter", UserLetterSchema);