const router = require("express").Router();
const InlineAdvertises = require("../models/InlineAdvertises");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middleware/verifytoken");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const path = require("path");
//create
router.post("/", upload.single("img") ,verifyTokenAndAuthorization, async (req,res)=>{
    let fileUrl = req.file?.path.replace(/\\/g, "/");
    try{
        const result = await cloudinary.uploader.upload(fileUrl, {
            upload_preset: "Mern_redux-practice",
            resource_type: "auto",
        })
        const newInlineAdvertises = new InlineAdvertises({
            cloudinary_id: result.public_id,
            theme: req.body.theme,
            title: req.body.title,
            content:req.body.content,
            img: result.secure_url,
        })
        const savedInlineAdvertises = await newInlineAdvertises.save();
        res.status(200).json(savedInlineAdvertises);
    } catch(error){
        res.status(403)
        throw new Error("Aktion fehlgeschlagen");
    }
});
//update
router.put("/:id", upload.single("img"), verifyTokenAndAuthorization, async (req,res)=>{
    let fileUrl = req.file?.path.replace(/\\/g, "/");
    try{
        let updatedInlineAdvertises = await InlineAdvertises.findById(req.params.id);
        //destroy
        if(req.file){
            await cloudinary.uploader.destroy(updatedInlineAdvertises.cloudinary_id);
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
            theme: req.body.theme || updatedInlineAdvertises.theme,
            title: req.body.title || updatedInlineAdvertises.title,
            content: req.body.content || updatedInlineAdvertises.content,
            cloudinary_id: result ? result.public_id : updatedInlineAdvertises.cloudinary_id,
            img: result ? result.secure_url : updatedInlineAdvertises.img,
        }
        updatedInlineAdvertises = await InlineAdvertises.findByIdAndUpdate(req.params.id, updatedData, {
            new:true,
        })

        res.status(200).json(updatedInlineAdvertises);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//increment
router.post('/increment', async (req,res)=>{
    try{
        await InlineAdvertises.findOneAndUpdate({_id:req.body.id}, {$inc:{clicked:1}})
    }catch(error){
        res.status(404)
        throw new Error("Not found");
    }
})
//delete
router.delete("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try{
        //find
        let deleteInlineAdvertises = await InlineAdvertises.findById(req.params.id);
        //delete cloudinary
        await cloudinary.uploader.destroy(deleteInlineAdvertises.cloudinary_id);

        await deleteInlineAdvertises.remove();
        res.status(200).json(`Der Beitrag mit der Id ${req.params.id} wurde gelöscht`);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
router.get("/find/:id", async (req, res)=>{
    try{
        const getInlineAdvertises = await InlineAdvertises.findById(req.params.id);
        res.status(200).json(getInlineAdvertises);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get all
router.get("/find/", async (req, res)=>{
    try{
        const getAllInlineAdvertises = await InlineAdvertises.find();
        res.status(200).json(getAllInlineAdvertises);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});

module.exports = router;