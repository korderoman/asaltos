const axios= require('axios');
require('dotenv').config();
class VideoProcessedController {


    getProcessedUrl=async (id)=>{
        console.log("Iniciando la obtención del vídeo procesado")
        const urlPath=`${process.env.BACKEND_PYTHON}/process`
        console.log("url", urlPath)
        try {
            const response = await axios.post(urlPath,{video_id:id});
            return response.data;

        }catch (e) {
            console.error(e)
        }
    }
}

module.exports=VideoProcessedController;
