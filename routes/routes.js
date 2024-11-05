const routes=require('express').Router();
const uploader= require("../controllers/multer.controller")
const CloudStorageController=  require("../controllers/cloud-storage.controller")
const gcpStorage = new CloudStorageController();
routes.get("/", async (req,res)=>{
    console.log("up", uploader)
    res.render('index');
})

routes.post("/",uploader, async (req,res)=>{
    await gcpStorage.uploadFile(req)
    res.redirect("/")
})

module.exports = routes;
