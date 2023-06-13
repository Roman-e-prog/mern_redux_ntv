const mongoose = require('mongoose');

const NewsletterOrderSchema = new mongoose.Schema({
    email:{type:String, required:true},
},
    {timestamps:true}
)

module.exports = mongoose.model("NewsletterOrder", NewsletterOrderSchema);