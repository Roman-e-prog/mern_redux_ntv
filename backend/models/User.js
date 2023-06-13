const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    vorname: {type:String, required:true},
    nachname:{type:String, required:true},
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    passwort:{type:String, minlength:6, required:true},
    isAdmin: {type:Boolean, default: false},
},
    {timestamps:true},
);

module.exports = mongoose.model("User", UserSchema);