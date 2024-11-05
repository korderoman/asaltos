const multer = require("multer");
const path=require("path");
//10mb
let uploaderGcp=multer({storage:multer.memoryStorage(), limits:{fileSize:30*1024*1024}});
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"../data"))
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const uploadOnPremise=multer({storage:storage});


module.exports = {
    uploaderGcp:uploaderGcp.single("file"),uploadOnPremise:uploadOnPremise,}
