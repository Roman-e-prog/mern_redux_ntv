const router = require("express").Router();
const Daylinks = require("../models/Daylinks");
const {verifyTokenAndAdmin} = require("../middleware/verifytoken");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const path = require("path");
//create
router.post("/", upload.single("img") ,verifyTokenAndAdmin, async (req,res)=>{
    let fileUrl = req.file?.path.replace(/\\/g, "/");
    try{ 
        const result = await cloudinary.uploader.upload(fileUrl, {
            upload_preset: "Mern_redux-practice",
            resource_type: "auto",
        })
        const newDayLinks = new Daylinks({
            cloudinary_id: result.public_id, 
            title: req.body.title,
            content:req.body.content,
            img: result.secure_url,
            ident: req.body.ident,
        })
        const savedDayLinks = await newDayLinks.save();
        res.status(200).json(savedDayLinks);
    } catch(error){ 
        res.status(403)
        throw new Error("Action failed");
        
    }
});
//update
router.put("/:id", upload.single("img"), verifyTokenAndAdmin, async (req,res)=>{
    let fileUrl = req.file?.path.replace(/\\/g, "/");
    try{
        let updatedDayLinks = await Daylinks.findById(req.params.id);
        //destroy
        if(req.file){
            await cloudinary.uploader.destroy(updatedDayLinks.cloudinary_id);
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
            ident: req.body.ident || updatedDayLinks.ident,
            title: req.body.title || updatedDayLinks.title,
            content: req.body.content || updatedDayLinks.content,
            cloudinary_id: result ? result.public_id : updatedDayLinks.cloudinary_id,
            img: result ? result.secure_url : updatedDayLinks.img,
        }
        updatedDayLinks = await Daylinks.findByIdAndUpdate(req.params.id, updatedData, {
            new:true,
        })

        res.status(200).json(updatedDayLinks);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//delete
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        //find
        let deleteDayLinks = await Daylinks.findById(req.params.id);
        //delete cloudinary
        await cloudinary.uploader.destroy(deleteDayLinks.cloudinary_id);

        await deleteDayLinks.remove();
        res.status(200).json(`Der Beitrag mit der Id ${req.params.id} wurde gelöscht`);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
router.get("/find/:id", async (req, res)=>{
    try{
        const getDaylinks = await Daylinks.findById(req.params.id);
        res.status(200).json(getDaylinks);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get all
router.get("/find", async (req, res)=>{
    try{
        const getAllDaylinks = await Daylinks.find();
        res.status(200).json(getAllDaylinks);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});

module.exports = router;