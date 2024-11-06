const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
const path = require("path");
require('dotenv').config();


class CloudStorageController {
    constructor() {
        this.storage = new Storage({keyFilename:process.env.SERVICE_ACCOUNT_GCP2, projectId: process.env.PROJECT_ID2});
        this.bucket= this.storage.bucket('videos_asaltos3')
    }

    uploadFile=async (req)=>{
        if(!req.file){
            return {success:false};
        }
        return await this.uploadFileToBucket(req)


    }

    uploadFileToBucket=async (req)=>{
        try{
           return  await this.uploadFileInPromise(req)
        }catch (e) {
            console.log(e)
        }finally {

        }

    }

    uploadFileInPromise=async (req)=>{
        return new Promise((resolve, reject)=>{
            const blob = this.bucket.file(req.file.originalname);
            const blobStream = blob.createWriteStream({resumable:true,contentType: req.file.mimetype});
            blobStream.on('finish',()=>{
                console.log("finalizó la subida")
                const urlFile=`https://storage.googleapis.com/${'videos_asaltos3'}/${req.file.originalname}`;
                //console.log("url",urlFile)*/
                //const urlFile=await this.generateSignedUrl(blob)
                const response={status:"success",message:`Se subió el archivo ${req.file.originalname} a gcp`, extras:{url: urlFile}};
                resolve(response)
            })
            blobStream.on('error',(err)=>{
                console.log("error",err);
                reject({status:'error',message:"Hubo un error al momento de subir el archivo a gcp"});

            });
            blobStream.end(req.file.buffer);
        })
    }

    generateSignedUrl=async (blobFile)=>{
        const [url] = await blobFile.getSignedUrl({
            version:'v4',
            action: 'read',
            expires: Date.now() + 1000 * 60 * 60, // Expira en 1 hora
        });
        return url;
    }

    uploadFileFromLocal=async (id)=>{
        try{
            const localFilePath = path.join(__dirname, "../data", `${id}.mp4`); // Ajusta la ruta y el nombre del archivo según tu carpeta
            if (!fs.existsSync(localFilePath)) {
                return {success:'error', message:"El archivo no se encontró en la carpeta local."};
            }
            await this.bucket.upload(localFilePath,{
                resumable:true,
                contentType: "video/mp4", // Ajusta el tipo de contenido según el archivo
                metadata: {
                    cacheControl: "public, max-age=31536000",
                }
            });
            const urlFile=`https://storage.googleapis.com/${'videos_asaltos3'}/${id}.mp4`;
            return {status:"success",message:`Se subió el archivo ${id}.mp4 a gcp`, extras:{url: urlFile}};


        }catch (e) {
            console.error(e)
        }

    }

    uploadFileInBlob=async(req)=>{
        let response={}
        const blob = this.bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({resumable:true,contentType: req.file.mimetype});
        blobStream.on('finish',()=>{
            console.log("finalizó la subida");
            const urlFile=`https://storage.googleapis.com/${'videos_asaltos3'}/${req.file.originalname}`;
            //console.log("url",urlFile)*/
            //const urlFile=await this.generateSignedUrl(blob)
            response={status:"success",message:`Se subió el archivo ${req.file.originalname} a gcp`, extras:{url: urlFile}}
        });
        blobStream.on('error',(err)=>{
            console.log("error",err);
           response=({status:'error',message:"Hubo un error al momento de subir el archivo a gcp"});

        });
        blobStream.end(req.file.buffer);

    }

    getFile=async (originalName)=>{
        const file = this.bucket.file(originalName);
        return await this.generateSignedUrl(file);

    }


}

module.exports = CloudStorageController;
