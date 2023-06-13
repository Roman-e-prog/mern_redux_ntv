const router = require("express").Router();
const SliderItem = require("../models/SliderItem");
const {verifyTokenAndAdmin} = require("../middleware/verifytoken");

//create
router.post("/", verifyTokenAndAdmin, async (req,res)=>{
    const newSliderItem = new SliderItem(req.body);
    try{
        const savedSliderItem = await newSliderItem.save();
        res.status(200).json(savedSliderItem);
    } catch(error){
        res.status(403)
        throw new Error("Aktion fehlgeschlagen");
    }
});
//update
router.put("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const updatedSliderItem = await SliderItem.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true});
        res.status(200).json(updatedSliderItem);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//delete
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        await SliderItem.findByIdAndDelete(req.params.id);
        res.status(200).json(`Der Beitrag mit der Id ${req.params.id} wurde gelöscht`);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
router.get("/find/:id", async (req, res)=>{
    try{
        const getSliderItem = await SliderItem.findById(req.params.id);
        res.status(200).json(getSliderItem);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get all
router.get("/find", async (req, res)=>{
    try{
        const getAllSliderItem = await SliderItem.find();
        res.status(200).json(getAllSliderItem);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});

module.exports = router;