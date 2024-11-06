const uploader=require("./multer.controller")
const fs=require("fs");
const path=require("path");
const youtubedl = require("youtube-dl-exec");
class OnPremiseController {
    constructor() {
        this.uploadOnPremise = uploader.uploadOnPremise
    }
    uploadToOnPremise=(req,res)=>{
        return new Promise((resolve,reject)=>{
            this.uploadOnPremise.single("file")(req,res,(error)=>{
                if(error){
                    reject({status:'error',message:"Hubo un error al subir el archivo",extras:error})
                }else {
                    resolve({status:"success",message:`Se subió con éxito el archivo ${req.file.originalname}`})
                }
            })
        })
    }

    uploaderOnPremiseFromVideo=async (req, res)=>{
        try{
             return await this.uploadToOnPremise(req,res)
        }catch (e) {
            console.error(e)
        }
    }
    uploaderOnPremiseFromUrl=async (url)=>{
        const pathToSplit="https://www.youtube.com/watch?v="
        const id=url.split(pathToSplit)[1]
        await youtubedl(url, {
            output: path.join(__dirname,`../data/${id}.mp4`),
            format: "mp4", // Especifica el formato de salida (puede variar según disponibilidad)
        });
        return id;
    }


}

module.exports= OnPremiseController;
