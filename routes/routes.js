
const multer = require('multer')
const cloudnary = require('cloudinary')
const cloudinary = require('cloudinary').v2;

const express = require("express");
// const { model } = require("mongoose");
const model = require('../models/model')

const {CloudinaryStorage}=require('multer-storage-cloudinary')
cloudinary.config({
          cloud_name: "citizen",
          api_key: "373369271762559",
          api_secret: "xe1Y1WOi7P7bUFPH3riVzl0HGGU"
});

// function uploadfolder(folder){
          const storage = new CloudinaryStorage({
                    cloudinary:cloudinary,
                    // params:{
                    //   folder:"",
                    //   allowedFormat:[
                    //           "jpg","png","jpeg"
                    //   ]
          
                    // }
          });
// };
const upload = multer({ storage: storage })

const router = express.Router();


///POST DATA



router.post('/post', upload.single('image'), async (req, res) => {
          try {
            const result = await cloudnary.uploader.upload(req.file.path, {
              folder: 'BLOG',
              use_filename: true,
            });
            const payload=req.body;
            console.log(payload)
            const imageUrl = result.secure_url;
        
            const data = new model({
              title: req.body.title,
              description: req.body.description,
              image: imageUrl,
            });
        
            const savedData = await data.save();
            res.status(200).json(savedData);
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
        });
///GET ALL DATA
router.get("/getAll", async (req, res) => {
          try {
                    const getAllData = await model.find()
                    res.json(getAllData)
          } catch (error) {
                    res.status(500).json({ message: error.message })
          }
})
///GET DATA BY ID

router.get("/getOne/:id", async (req, res) => {
          try {
                    const getById = await model.findById(req.params.id)
                    res.json(getById)
          } catch (error) {
                    res.status(500).json({ message: error.message })
          }
})
///GetBy Key Word
router.get("/filter/:search", async (req, res) => {
          try {
                    const filter = await model.find({title: {$regex :req.params.search}})
                    res.json(filter)
          } catch (error) {
                    res.status(500).json({ message: error.message })
          }
})

///UPDATE DATA BY ID
router.patch("/update/:id", upload.single("image"), async (req, res) => {

          try {
                   if(req.file){

                    const uploadOptions = {
                              folder: "BLOG",    
                              use_filename: true
                    };
                    const cloudinaryResponse = await cloudnary.uploader.upload(req.file.path, uploadOptions); 
                    // Upload the image to Cloudinary
                    const imageUrl = cloudinaryResponse.secure_url;
                    const id = req.params.id;
                    const updatedData = req.body;
                    const options = { new: true };
                     req.body.image=imageUrl
                    const result = await model.findByIdAndUpdate(id, updatedData, options)
                    
                    res.send(result);
                   }

          } catch (error) {
                    res.status(400).json({ message: error.message})
          }


})

///DELETE BY ID
router.delete("/delete/:id", async (req, res) => {

          try {
                    const id = req.params.id
                    const data = await model.findByIdAndDelete(id);
                    res.send(`Document with ${data.name} has been deleted..`)
          } catch (error) {
                    res.status(400).json({ message: error.message})
          }
          // res.send("Delete Data from DB")
})

module.exports = router;
