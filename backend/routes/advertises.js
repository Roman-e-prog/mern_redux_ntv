const router = require("express").Router();
const Advertises = require("../models/Advertises");
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
        const newAdvertises = new Advertises({
            cloudinary_id: result.public_id,
            ressort: req.body.ressort,
            theme: req.body.theme,
            title: req.body.title,
            content:req.body.content,
            img: result.secure_url,
        })
        const savedAdvertises = await newAdvertises.save();
        res.status(200).json(savedAdvertises);
    } catch(error){
        res.status(403)
        throw new Error("Aktion fehlgeschlagen");
    }
});
//update
router.put("/:id", upload.single("img"), verifyTokenAndAdmin, async (req,res)=>{
    let fileUrl = req.file?.path.replace(/\\/g, "/");
    try{
        let updatedAdvertises = await Advertises.findById(req.params.id);
        //destroy
        if(req.file){
            await cloudinary.uploader.destroy(updatedAdvertises.cloudinary_id);
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
            theme: req.body.theme || updatedAdvertises.theme,
            title: req.body.title || updatedAdvertises.title,
            content: req.body.content || updatedAdvertises.content,
            cloudinary_id: result ? result.public_id : updatedAdvertises.cloudinary_id,
            img: result ? result.secure_url : updatedAdvertises.img,
        }
        updatedAdvertises = await Advertises.findByIdAndUpdate(req.params.id, updatedData, {
            new:true,
        })

        res.status(200).json(updatedAdvertises);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//increment
router.post('/increment', async (req,res)=>{
    try{
        await Advertises.findOneAndUpdate({_id:req.body.id}, {$inc:{clicked:1}})
    }catch(error){
        res.status(404)
        throw new Error("Not found");
    }
})
//delete
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        //find
        let deleteAdvertises = await Advertises.findById(req.params.id);
        //delete cloudinary
        await cloudinary.uploader.destroy(deleteAdvertises.cloudinary_id);

        await deleteAdvertises.remove();
        res.status(200).json(`Der Beitrag mit der Id ${req.params.id} wurde gelöscht`);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
router.get("/find/:id", async (req, res)=>{
    try{
        const getAdvertises = await Advertises.findById(req.params.id);
        res.status(200).json(getAdvertises);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get all
router.get("/find/", async (req, res)=>{
    try{
        const getAllAdvertises = await Advertises.find();
        res.status(200).json(getAllAdvertises);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});

module.exports = router;