const router = require("express").Router();
const Boersenwerte = require("../models/Boersenwerte");
const {verifyTokenAndAdmin} = require("../middleware/verifytoken");

//create
router.post("/", verifyTokenAndAdmin, async (req,res)=>{
    const newBoersenwerte = new Boersenwerte(req.body);
    try{
        const savedBoersenwerte = await newBoersenwerte.save();
        res.status(200).json(savedBoersenwerte);
    } catch(error){
        res.status(403)
        throw new Error("Aktion fehlgeschlagen");
    }
});
//update
router.put("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const updatedBoersenwerte = await Boersenwerte.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true});
        res.status(200).json(updatedBoersenwerte);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//delete
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        await Boersenwerte.findByIdAndDelete(req.params.id);
        res.status(200).json(`Der Beitrag mit der Id ${req.params.id} wurde gelöscht`);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
router.get("/find/:id", async (req, res)=>{
    try{
        const getBoersenwerte = await Boersenwerte.findById(req.params.id);
        res.status(200).json(getBoersenwerte);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get all
router.get("/find/", async (req, res)=>{
    try{
        const getAllBoersenwerte = await Boersenwerte.find();
        res.status(200).json(getAllBoersenwerte);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});

module.exports = router;