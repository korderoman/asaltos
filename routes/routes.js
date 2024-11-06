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

routes.post("/upload/v1", async (req,res)=>{
    await onPremiseStorage.uploaderOnPremiseFromVideo(req,res)
    res.status(200).send({status:"success"})
})

routes.post("/upload/v2", uploader.uploaderGcp,async (req,res)=>{
    const  response =await gcpStorage.uploadFile(req)
    res.status(200).send(response);
})

routes.post("/upload/v3", async (req,res)=>{
    const id=await onPremiseStorage.uploaderOnPremiseFromUrl(req.body.url)
    const response=await gcpStorage.uploadFileFromLocal(id);
    res.status(200).send(response)

})

module.exports = routes;
