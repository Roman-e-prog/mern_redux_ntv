const router = require("express").Router();
const MainNews = require("../models/Mainnews");
const {verifyTokenAndAdmin} = require("../middleware/verifytoken");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");

//create
router.post("/", upload.single("img"), verifyTokenAndAdmin, async (req,res)=>{
    let fileUrl = req.file?.path.replace(/\\/g, "/");
    try{
        const uploadResult = await cloudinary.uploader.upload(fileUrl,{
            upload_preset: "Mern_redux-practice",
            resource_type: "auto",
        });
        const newMainNews = new MainNews({
            cloudinary_id : uploadResult.public_id,
            ressort: req.body.ressort,
            theme: req.body.theme,
            title: req.body.title,
            content: req.body.content,
            img: uploadResult.secure_url,
        });
        const savedMainNews = await newMainNews.save();
        res.status(200).json(savedMainNews);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
router.put("/:id", upload.single("img"), verifyTokenAndAdmin, async (req,res)=>{
    let fileUrl = req.file?.path.replace(/\\/g, "/");
    try{
        let updatedMainNews = await MainNews.findById(req.params.id);
        //destroy
        if(req.file){
            await cloudinary.uploader.destroy(updatedMainNews.cloudinary_id);
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
            ressort: req.body.ressort || updatedMainNews.ressort,
            theme: req.body.theme || updatedMainNews.theme,
            title: req.body.title || updatedMainNews.title,
            content: req.body.content || updatedMainNews.content,
            cloudinary_id: result ? result.public_id : updatedMainNews.cloudinary_id,
            img: result ? result.secure_url : updatedMainNews.img,
        }
        updatedMainNews = await MainNews.findByIdAndUpdate(req.params.id, updatedData, {
            new:true,
        })

        res.status(200).json(updatedMainNews);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//increment
router.post("/increment", async (req,res)=>{
    try{
        await MainNews.findOneAndUpdate({_id:req.body.id}, {$inc:{clicked:1}})
    }catch(error){
        res.status(404)
        throw new Error("Not found");
    }
})
//increment Stars
router.post('/evaluate', async (req,res)=>{
    try{
        await MainNews.findOneAndUpdate({_id: req.body.id}, {$inc:{stars:req.body.starCount}})
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
})
//delete
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        //find
        let deleteMainnews = await MainNews.findById(req.params.id);
        //delete cloudinary
        await cloudinary.uploader.destroy(deleteMainnews.cloudinary_id);

        await deleteMainnews.remove();
        res.status(200).json(`Der Beitrag mit der Id ${req.params.id} wurde gelöscht`);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
router.get("/find/:id", async (req, res)=>{
    try{
        const getMainNews = await MainNews.findById(req.params.id);
        res.status(200).json(getMainNews);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get all
router.get("/find/", async (req, res)=>{
    try{
        const getAllMainNews = await MainNews.find();
        res.status(200).json(getAllMainNews);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});

module.exports = router;