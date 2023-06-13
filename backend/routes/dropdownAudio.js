const router = require("express").Router();
const DropdownAudio = require("../models/DropdownAudio");
const {verifyTokenAndAdmin} = require("../middleware/verifytoken");
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');
//create
router.post("/", upload.fields([{name:"iframe0", maxCount:1},{name:"iframe1", maxCount:1},{name:"iframe2", maxCount:1}]), verifyTokenAndAdmin, async (req, res) => {
  console.log("Hallo");
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
   
    const newAudio = new DropdownAudio({
      lis: req.body.lis && JSON.parse(req.body.lis).length > 0 ? JSON.parse(req.body.lis).split(',') : [],
      videos,
      themen: JSON.parse(req.body.themen).split(','),
    });
    
    const savedAudio = await newAudio.save()
    res.status(200).json(savedAudio)
  } catch (error) {
    console.log(error);
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
      let currentAudio = await DropdownAudio.findById(req.params.id);
      const files = req.files;
      //at first I store the currentVideos in uploadedFiles
      const uploadedFiles = currentAudio.videos.map(video => ({
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
          lis = currentAudio.lis;
        }
        let themen;
        if (req.body.themen) {
          if (Array.isArray(JSON.parse(req.body.themen))) {
            themen = JSON.parse(req.body.themen);
          } else {
            themen = JSON.parse(req.body.themen).split(",");
          }
        } else {
          themen = currentAudio.themen;
        }
        const updatedAudioData = {
          lis,
          videos,
          themen,
        };
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const updatedAudio = await DropdownAudio.findByIdAndUpdate(
          req.params.id,
          updatedAudioData,
          { new: true }
        );
        res.status(200).json(updatedAudio);
      } catch (error) {
        res.status(404);
        throw new Error("Nicht gefunden");
      }
    }
  );
//delete
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        await DropdownAudio.findByIdAndDelete(req.params.id);
        res.status(200).json(`Der Beitrag mit der Id ${req.params.id} wurde gelöscht`);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden")
    }
});
//get
router.get("/find/:id", async (req, res)=>{
    try{
        const getAudio = await DropdownAudio.findById(req.params.id);
        res.status(200).json(getAudio);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});
//get all
router.get("/find/", async (req, res)=>{
    try{
        const getAllAudio = await DropdownAudio.find();
        res.status(200).json(getAllAudio);
    } catch(error){
        res.status(404)
        throw new Error("Nicht gefunden");
    }
});

module.exports = router;