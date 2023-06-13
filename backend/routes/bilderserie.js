const router = require("express").Router();
const Bilderserie = require("../models/Bilderserie");
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
        const newBilderserie = new Bilderserie({
            cloudinary_id: result.public_id,
            alt: req.body.alt,
            title: req.body.title,
            content:req.body.content,
            img: result.secure_url,
        })
        const savedBilderserie = await newBilderserie.save();
        res.status(200).json(savedBilderserie);
    } catch(error){
        res.status(403)
        throw new Error("Aktion fehlgeschlagen");
    }
});
//update
router.put("/:id", upload.single("img"), verifyTokenAndAdmin, async (req,res)=>{
    let fileUrl = req.file?.path.replace(/\\/g, "/");
    try{
        let updatedBilderserie = await Bilderserie.findById(req.params.id);
        //destroy
        if(req.file){
            await cloudinary.uploader.destroy(updatedBilderserie.cloudinary_id);
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
            alt: req.body.alt || updatedBilderserie.alt,
            title: req.body.title || updatedBilderserie.title,
            content: req.body.content || updatedBilderserie.content,
            cloudinary_id: result ? result.public_id : updatedBilderserie.cloudinary_id,
            img: result ? result.secure_url : updatedBilderserie.img,
        }
        updatedBilderserie = await Bilderserie.findByIdAndUpdate(req.params.id, updatedData, {
            new:true,
        })

        res.status(200).json(updatedBilderserie);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//delete
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        //find
        let deleteBilderserie = await Bilderserie.findById(req.params.id);
        //delete cloudinary
        await cloudinary.uploader.destroy(deleteBilderserie.cloudinary_id);

        await deleteBilderserie.remove();
        res.status(200).json(`Der Beitrag mit der Id ${req.params.id} wurde gelöscht`);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get
router.get("/find/:id", async (req, res)=>{
    try{
        const getBilderserie = await Bilderserie.findById(req.params.id);
        res.status(200).json(getBilderserie);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get all
router.get("/find/", async (req, res)=>{
    try{
        const getAllBilderserie = await Bilderserie.find();
        res.status(200).json(getAllBilderserie);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});

module.exports = router;