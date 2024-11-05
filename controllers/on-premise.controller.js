const uploader=require("./multer.controller")
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

    uploaderOnPremise=async (req,res)=>{
        try{
             return await this.uploadToOnPremise(req,res)
        }catch (e) {
            console.error(e)
        }
    }
}

module.exports= OnPremiseController;
