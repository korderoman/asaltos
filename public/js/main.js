document.addEventListener("DOMContentLoaded", () => {
    sendFile()
})

const sendFile=()=>{
    document.addEventListener('submit',async (e)=>{
        e.preventDefault();
        console.log("Sending...")
        try{
            const video = document.querySelector("#file");
            console.log(video.files[0]);
            const formData = new FormData();
            formData.append('file',video.files[0]);
            const response=await fetch("/",{method:"POST",body:formData});
            const data = await response.json();
            video.value=''
        }catch (e) {
            console.log(e)
        }

    })
}

