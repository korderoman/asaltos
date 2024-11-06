const routes=require('express').Router();
const uploader= require("../controllers/multer.controller")
const CloudStorageController=  require("../controllers/cloud-storage.controller")
const OnPremiseController=require("../controllers/on-premise.controller")
const VideoProcessedController = require("../controllers/video-processed.controller");
const gcpStorage = new CloudStorageController();
const onPremiseStorage= new OnPremiseController();
const videoProcessed= new VideoProcessedController();
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
    console.log("iniciando el proceso de subida manual")
    const id=await onPremiseStorage.uploaderOnPremiseFromUrl(req.body.url)
    console.log("iniciando el proceso de subida storage")
    const response1=await gcpStorage.uploadFileFromLocal(id);
    console.log("iniciando obtención de la url procesada")
    const response2=await videoProcessed.getProcessedUrl(id)
    console.log(response2)
    res.status(200).send(response2)

})

module.exports = routes;
