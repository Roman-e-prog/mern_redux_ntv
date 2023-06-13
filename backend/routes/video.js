const router = require("express").Router();
const Videos = require("../models/Videos");
const {verifyTokenAndAdmin} = require("../middleware/verifytoken");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");

//create
router.post("/", upload.single('src'), verifyTokenAndAdmin, async (req,res)=>{
    try{
        const file = req.file;
        const fileUrl = file.path.replace(/\\/g, "/");
        const result = await cloudinary.uploader.upload(fileUrl, {
            upload_preset: "Mern_redux-practice",
            resource_type: "video",
        });    
        const newVideos= new Videos({
            cloudinary_id: result.public_id,
            ressort: req.body.ressort,
            theme: req.body.theme,
            title:req.body.title,
            src: result.secure_url,
        })
        const savedVideos= await newVideos.save();
        res.status(200).json(savedVideos);
    } catch(error){
        res.status(403)
        throw new Error("Action failed");
    }
});
//update
router.put("/:id", upload.single("src"), verifyTokenAndAdmin, async (req,res)=>{
    try{
        let updatedVideos= await Videos.findById(req.params.id);
        if(req.file){
            await cloudinary.uploader.destroy(updatedVideos.cloudinary_id);
        }
        let result;
        if(req.file){
        const fileUrl = req.file.path.replace(/\\/g, "/");
        result = await cloudinary.uploader.upload(fileUrl, {
            upload_preset: "Mern_redux-practice",
            resource_type: "auto",
        })
        }
        const updatedData = {
            ressort: req.body.ressort || updatedVideos.ressort,
            theme: req.body.theme || updatedVideos.theme,
            title: req.body.title || updatedVideos.title,
            cloudinary_id: result ? result.public_id : updatedVideos.cloudinary_id,
            img: result ? result.secure_url : updatedVideos.img,
        }
        updatedVideos= await Videos.findByIdAndUpdate(req.params.id, updatedData, {
            new:true,
        })
        res.status(200).json(updatedVideos);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//increment
router.post('/increment', async (req,res)=>{
    try{
        await Videos.findOneAndUpdate({_id:req.body.id}, {$inc:{clicked:1}})
    }catch(error){
        res.status(404)
        throw new Error("Not found");
    }
})
//delete
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        //find
        let deleteVideos= await Videos.findById(req.params.id);
        //delete cloudinary
        await cloudinary.uploader.destroy(deleteVideos.cloudinary_id);

        await deleteVideos.remove();
        res.status(200).json(`Der Beitrag mit der Id ${req.params.id} wurde gelöscht`);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
router.get("/find/:id", async (req, res)=>{
    try{
        const getVideos = await Videos.findById(req.params.id);
        res.status(200).json(getVideos);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get all
router.get("/find", async (req, res)=>{
    try{
        const getAllVideos = await Videos.find();
        res.status(200).json(getAllVideos);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
module.exports = router;