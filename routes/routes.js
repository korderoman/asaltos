const routes=require('express').Router();
const uploader= require("../controllers/multer.controller")
const CloudStorageController=  require("../controllers/cloud-storage.controller")
const OnPremiseController=require("../controllers/on-premise.controller")
const gcpStorage = new CloudStorageController();
const onPremiseStorage= new OnPremiseController();
routes.get("/", async (req,res)=>{
    console.log("up", uploader)
    res.render('index');
})

routes.post("/upload",uploader.uploaderGcp, async (req,res)=>{
   console.log("req",req.file)
    await gcpStorage.uploadFile(req)
    res.status(200).send({status:"success"});
})

routes.post("/uploadv2",async (req,res)=>{
    const response = await onPremiseStorage.uploaderOnPremise(req,res)
    console.log("req",response)
    res.status(200).send({status:"success"});
})

module.exports = routes;
