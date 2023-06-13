const router = require("express").Router();
const InlineNews = require("../models/Inlinenews");
const {verifyTokenAndAdmin} = require("../middleware/verifytoken");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");

//create
router.post("/", upload.single("img") ,verifyTokenAndAdmin, async (req,res)=>{
    let fileUrl = req.file?.path.replace(/\\/g, "/");
    try{
        const result = await cloudinary.uploader.upload(fileUrl, {
            upload_preset: "Mern_redux-practice",
            resource_type: "auto",
        })
        const newInlineNews = new InlineNews({
            cloudinary_id: result.public_id,
            ressort: req.body.ressort,
            theme: req.body.theme,
            title: req.body.title,
            content:req.body.content,
            img: result.secure_url,
        })
        const savedInlineNews = await newInlineNews.save();
        res.status(200).json(savedInlineNews);
    } catch(error){
        res.status(403)
        throw new Error("Aktion fehlgeschlagen");
    }
});
//update
router.put("/:id", upload.single("img"), verifyTokenAndAdmin, async (req,res)=>{
    let fileUrl = req.file?.path.replace(/\\/g, "/");
    try{
        let updatedInlineNews = await InlineNews.findById(req.params.id);
        //destroy
        if(req.file){
            await cloudinary.uploader.destroy(updatedInlineNews.cloudinary_id);
        }
        //upload
        let result;
        if(req.file){
        result = await cloudinary.uploader.upload(fileUrl, {
            upload_preset: "Mern_redux-practice",
            resource_type: "auto",
        })
        }
        const updatedData = {
            ressort: req.body.ressort || updatedInlineNews.ressort,
            theme: req.body.theme || updatedInlineNews.theme,
            title: req.body.title || updatedInlineNews.title,
            content: req.body.content || updatedInlineNews.content,
            cloudinary_id: result ? result.public_id : updatedInlineNews.cloudinary_id,
            img: result ? result.secure_url : updatedInlineNews.img,
        }
        updatedInlineNews = await InlineNews.findByIdAndUpdate(req.params.id, updatedData, {
            new:true,
        })
        res.status(200).json(updatedInlineNews);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//increment
router.post('/increment', async (req,res)=>{
    try{
        await InlineNews.findOneAndUpdate({_id:req.body.id}, {$inc:{clicked:1}})
    }catch(error){
        res.status(404)
        throw new Error("Not found");
    }
})
//increment Stars
router.post('/evaluate', async (req,res)=>{
    try{
        await InlineNews.findOneAndUpdate({_id: req.body.id}, {$inc:{stars:req.body.starCount}})
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
})
//delete
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        //find
        let deleteInlinenews = await InlineNews.findById(req.params.id);
        //delete cloudinary
        await cloudinary.uploader.destroy(deleteInlinenews.cloudinary_id);

        await deleteInlinenews.remove();
        res.status(200).json(`Der Beitrag mit der Id ${req.params.id} wurde gelöscht`);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
router.get("/find/:id", async (req, res)=>{
    try{
        const getInlineNews = await InlineNews.findById(req.params.id);
        res.status(200).json(getInlineNews);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get all
router.get("/find", async (req, res)=>{
    try{
        const getAllInlineNews = await InlineNews.find();
        res.status(200).json(getAllInlineNews);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});

module.exports = router;