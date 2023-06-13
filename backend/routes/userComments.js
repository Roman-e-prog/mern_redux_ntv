const router = require("express").Router();
const UserLetterComment = require("../models/UserLetterComments");
const {verifyToken, verifyTokenAndAdmin} = require("../middleware/verifytoken");
router.post("/", verifyToken, async (req,res)=>{
    try{
        const newComment = new UserLetterComment(req.body);
        const savedComment = await newComment.save();
        
        res.status(200).json(savedComment);
    } catch(error){
        res.status(500)
        throw new Error(error);
    }
})
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        await UserLetterComment.findByIdAndDelete(req.params.id)
        res.status(200).json("Kommentar wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Not found")
    }
})
router.get('/find', async (req,res)=>{
    try{
        const allComments = await UserLetterComment.find();
        res.status(200).json(allComments)
    }catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
})
router.post('/incrementCommentLike', async (req,res)=>{
    try{
        await UserLetterComment.findOneAndUpdate({_id:req.body.id}, {$inc:{likes:1}})
    }catch(error){
        res.status(404)
        throw new Error("Not found");
    }
})
router.post('/incrementCommentDisLike', async (req,res)=>{
    try{
        await UserLetterComment.findOneAndUpdate({_id:req.body.id}, {$inc:{disLikes:1}})
    }catch(error){
        res.status(404)
        throw new Error("Not found");
    }
})

module.exports = router;