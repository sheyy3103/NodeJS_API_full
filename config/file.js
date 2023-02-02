const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'./public/uploads');
    },
    filename: (req,file,cb) =>{
        const time = Date.now();
        cb(null,time + '-' + file.originalname);
    }
});

const uploadFile = multer({storage: storage});

module.exports = uploadFile;