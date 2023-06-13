const router = require("express").Router();
const UserLetter = require("../models/UserLetter");
const {verifyToken, verifyTokenAndAdmin} = require("../middleware/verifytoken");
router.post("/", verifyToken, async (req,res)=>{
    const newUserLetter = new UserLetter(req.body);
    try{
        const savedUserLetter = await newUserLetter.save();
        res.status(200).json(savedUserLetter);
    } catch(error){
        res.status(403)
        throw new Error("Action impossible")
    }
})
//delete
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        await UserLetter.findByIdAndDelete(req.params.id)
        res.status(200).json("Leserbrief wurde gelöscht");
    } catch(error){
        res.status(404)
        throw new Error("Not found")
    }
})
//get
router.get("/find", async (req,res)=>{
    try{
        const allUserLetter = await UserLetter.find()
        res.status(200).json(allUserLetter);
    } catch(error){
        res.status(404)
        throw new Error("Not found")
    }
})
//increment
router.post('/incrementLike', async (req,res)=>{
    try{
        await UserLetter.findOneAndUpdate({_id:req.body.id}, {$inc:{likes:1}})
    }catch(error){
        res.status(404)
        throw new Error("Not found");
    }
})
router.post('/incrementDisLike', async (req,res)=>{
    try{
        await UserLetter.findOneAndUpdate({_id:req.body.id}, {$inc:{disLikes:1}})
    }catch(error){
        res.status(404)
        throw new Error("Not found");
    }
})

module.exports = router;