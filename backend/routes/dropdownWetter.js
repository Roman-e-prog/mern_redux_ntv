const router = require("express").Router();
const DropdownWetter = require("../models/DropdownWetter");
const {verifyTokenAndAdmin} = require("../middleware/verifytoken");
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');
//create
router.post("/", upload.fields([{name:"iframe0", maxCount:1},{name:"iframe1", maxCount:1},{name:"iframe2", maxCount:1}]), verifyTokenAndAdmin, async (req, res) => {
  try {
    const files = req.files;
    const uploadedFiles = [];
    for(let value in files){
      const videos = files[value];
      for(let i = 0; i < videos.length; i++){
        const item = videos[i];
        const file = item.path;
        const fileUrl = file.replace(/\\/g, "/");
        const result = await cloudinary.uploader.upload(fileUrl, {
          upload_preset: "Mern_redux-practice",
          resource_type: "auto",
      })
      uploadedFiles.push(result);
    }
  }
    const videos = JSON.parse(req.body.videos).map((item, index) => {
      return {
        ...item,
        cloudinary_id:uploadedFiles[index].public_id,
        iframe:uploadedFiles[index].secure_url,
      };
    });
    const newWetter = new DropdownWetter({
      lis: JSON.parse(req.body.lis).split(','),
      videos,
      themen: JSON.parse(req.body.themen).split(','),
    });
    const savedWetter = await newWetter.save()
    res.status(200).json(savedWetter)
  } catch (error) {
    res.status(403).json({message:"Action failed"})
  }
}
);
//update
router.put(
    "/:id",
    upload.fields([
      { name: "iframe0", maxCount: 1 },
      { name: "iframe1", maxCount: 1 },
      { name: "iframe2", maxCount: 1 },
    ]),
    verifyTokenAndAdmin,
    async (req, res) => {
      let currentWetter = await DropdownWetter.findById(req.params.id);
      const files = req.files;
      //at first I store the currentVideos in uploadedFiles
      const uploadedFiles = currentWetter.videos.map(video => ({
        public_id: video.cloudinary_id,
        secure_url: video.iframe
      }));
      try {
        const storedVideos = JSON.parse(req.body.videos);
        //must to have it global
        let videos;
        //files is an object[]
        if (files) {
          for (let value in files) {
            const videos = files[value];
            for (let i = 0; i < videos.length; i++) {
              const item = videos[i];
              await cloudinary.uploader.destroy(storedVideos[i].cloudinary_id);
              const file = item.path;
              const fileUrl = file.replace(/\\/g, "/");
              const result = await cloudinary.uploader.upload(fileUrl, {
                upload_preset: "Mern_redux-practice",
                resource_type: "auto",
              });
              
              const fileIndex = parseInt(value.replace("iframe", ""));
              uploadedFiles[fileIndex] = result;
            }
          }
          try {
            videos = storedVideos.map((item, index) => {
              // Loop through all keys in files object
              for (const fieldname of Object.keys(files)) {
                // Get index from fieldname
                const fileIndex = parseInt(fieldname.replace("iframe", ""));
                if (uploadedFiles.length > 0 && index === fileIndex) {
                  // Update video object if index matches fileIndex
                  if (uploadedFiles[fileIndex]) {
                    return {
                      ...item,
                      cloudinary_id: uploadedFiles[fileIndex].public_id,
                      iframe: uploadedFiles[fileIndex].secure_url,
                    };
                  } else {
                    console.log("uploadedFiles[fileIndex] is undefined");
                  }
                }
              }
              return item;
            });
          } catch (error) {
            console.log("Error updating videos array:", error);
          }
        } else {
          videos = storedVideos;
        }
        let lis;
        if (req.body.lis) {
          if (Array.isArray(JSON.parse(req.body.lis))) {
            lis = JSON.parse(req.body.lis);
          } else {
            lis = JSON.parse(req.body.lis).split(",");
          }
        } else {
          lis = currentWetter.lis;
        }
        let themen;
        if (req.body.themen) {
          if (Array.isArray(JSON.parse(req.body.themen))) {
            themen = JSON.parse(req.body.themen);
          } else {
            themen = JSON.parse(req.body.themen).split(",");
          }
        } else {
          themen = currentWetter.themen;
        }
        const updatedWetterData = {
          lis,
          videos,
          themen,
        };
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const updatedWetter = await DropdownWetter.findByIdAndUpdate(
          req.params.id,
          updatedWetterData,
          { new: true }
        );
        res.status(200).json(updatedWetter);
      } catch (error) {
        res.status(404);
        throw new Error("Nicht gefunden");
      }
    }
  );
//delete
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        await DropdownWetter.findByIdAndDelete(req.params.id);
        res.status(200).json(`Der Beitrag mit der Id ${req.params.id} wurde gelöscht`);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
router.get("/find/:id", async (req, res)=>{
    try{
        const getWetter = await DropdownWetter.findById(req.params.id);
        res.status(200).json(getWetter);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get all
router.get("/find", async (req, res)=>{
    try{
        const getAllWetter = await DropdownWetter.find();
        res.status(200).json(getAllWetter);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});

module.exports = router;