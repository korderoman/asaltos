const {Storage} = require('@google-cloud/storage');
require('dotenv').config();

class CloudStorageController {
    constructor() {
        this.storage = new Storage({keyFilename:process.env.SERVICE_ACCOUNT_GCP, projectId: process.env.PROJECT_ID});
        this.bucket= this.storage.bucket('videos_asaltos')
    }

    uploadFile=async (req)=>{
        if(!req.file){
            return {success:false};
        }
        await this.uploadFileToBucket(req)


    }

    uploadFileToBucket=async (req)=>{
        const blob = this.bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({resumable:true,contentType: req.file.mimetype});
        blobStream.on('finish',()=>{console.log("finalizó la subida")})
        blobStream.on('error',(err)=>console.log("error",err));
        blobStream.end(req.file.buffer);
    }
}

module.exports = CloudStorageController;
