const router = require("express").Router();
const User = require("../models/User");
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middleware/verifytoken");


router.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }, {new:true})
        res.status(200).json(updatedUser);
    } catch(error){
        res.status(404)
        throw new Error("User nicht gefunden");
    }
});
//delete
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({id: req.params.id});
    } catch(error){
        res.status(404)
        throw new Error("User nicht gefunden");
    }
});
//get
router.get("/find/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {passwort, ...others} = user._doc;
        res.status(200).json(others);
    } catch(error){
        res.status(404)
        throw new Error("User nicht gefunden");
    }
});
//get all
router.get("/find", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const allUser = await User.find();
        res.status(200).json(allUser);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
})

module.exports = router;