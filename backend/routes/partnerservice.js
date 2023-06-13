const router = require("express").Router();
const Partnerservice = require("../models/Partnerservice");
const {verifyTokenAndAdmin} = require("../middleware/verifytoken");

//create
router.post("/", verifyTokenAndAdmin, async (req,res)=>{
    const newPartnerservice = new Partnerservice({
        title:req.body.title,
        content:req.body.content.split(",")
    });
    try{
        const savedPartnerservice = await newPartnerservice.save();
        res.status(200).json(savedPartnerservice);
    } catch(error){
        res.status(403)
        throw new Error("Aktion fehlgeschlagen");
    }
});
//update
router.put("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const updatePartnerServiceData = {
            title:req.body.title,
            content: req.body.content.split(",")
        }
        const updatedPartnerservice = await Partnerservice.findByIdAndUpdate(req.params.id, updatePartnerServiceData 
        , {new:true});
        res.status(200).json(updatedPartnerservice);
    } catch(error){
        res.status(404)
        console.log(error)
        throw new Error("Nicht gefunden");
    }
});
//delete
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        await Partnerservice.findByIdAndDelete(req.params.id);
        res.status(200).json(`Der Beitrag mit der Id ${req.params.id} wurde gelöscht`);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
router.get("/find/:id", async (req, res)=>{
    try{
        const getPartnerservice = await Partnerservice.findById(req.params.id);
        res.status(200).json(getPartnerservice);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get all
router.get("/find", async (req, res)=>{
    try{
        const getAllPartnerservice = await Partnerservice.find();
        res.status(200).json(getAllPartnerservice);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});

module.exports = router;