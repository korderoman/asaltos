const multer = require("multer");

//10mb
let uploader=multer({storage:multer.memoryStorage(), limits:{fileSize:30*1024*1024}});
module.exports = uploader.single("file")
