const mongoose = require("mongoose");

const UserLetterCommentSchema = new mongoose.Schema({
    comment:{type:String, required:true},
    commentSenderId:{type:String, required:true},
    commentSenderName: {type:String, required:true},
    userLetterId: {type:String, required:true},
    likes:{type:Number, default:0},
    disLikes:{type:Number, default:0},
},{timeStamps:true});

module.exports = mongoose.model("UserLetterComment", UserLetterCommentSchema);