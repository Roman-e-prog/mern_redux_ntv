const router = require("express").Router();
const {verifyTokenAndAdmin} = require("../middleware/verifytoken");
const BreakingNews = require("../models/BreakingNews");
router.post('/', verifyTokenAndAdmin, async (req,res)=>{
    const newBreakingNews = new BreakingNews(req.body);
    try{
        const savedBreakingNews = await newBreakingNews.save();
        res.status(200).json(savedBreakingNews);
    } catch(error){
        res.status(403)
        throw new Error("Aktion fehlgeschlagen");
    }
})
//update
router.put("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const updatedBreakingNews = await BreakingNews.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true});
        res.status(200).json(updatedBreakingNews);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//delete
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        await BreakingNews.findByIdAndDelete(req.params.id);
        res.status(200).json(`Der Beitrag mit der Id ${req.params.id} wurde gelöscht`);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
router.get("/find/:id", async (req, res)=>{
    try{
        const getBreakingNews = await BreakingNews.findById(req.params.id);
        res.status(200).json(getBreakingNews);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get all
router.get("/find", async (req, res)=>{
    try{
        const getAllBreakingNews = await BreakingNews.find();
        res.status(200).json(getAllBreakingNews);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});

module.exports = router;