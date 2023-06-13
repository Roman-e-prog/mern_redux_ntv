const router = require("express").Router();
const UkraineNews = require("../models/UkraineNews");
const {verifyTokenAndAdmin} = require("../middleware/verifytoken");


//create
router.post("/", verifyTokenAndAdmin, async (req,res)=>{
    const newUkraineNews = new UkraineNews(req.body);
    try{
        const savedUkraineNews = await newUkraineNews.save();
        res.status(200).json(savedUkraineNews);
    } catch(error){
        res.status(403)
        throw new Error("Aktion fehlgeschlagen");
    }
});
//update
router.put("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const updatedUkraineNews = await UkraineNews.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true});
        res.status(200).json(updatedUkraineNews);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//delete
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        await UkraineNews.findByIdAndDelete(req.params.id);
        res.status(200).json(`Der Beitrag mit der Id ${req.params.id} wurde gelöscht`);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
router.get("/find/:id", async (req, res)=>{
    try{
        const getUkraineNews = await UkraineNews.findById(req.params.id);
        res.status(200).json(getUkraineNews);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get all
router.get("/find", async (req, res)=>{
    try{
        const getAllUkraineNews = await UkraineNews.find();
        res.status(200).json(getAllUkraineNews);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});

module.exports = router;