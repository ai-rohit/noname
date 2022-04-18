const multer = require("multer");
const {CustomError} = require("../helpers");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
      cb(null,Date.now()+"_"+file.originalname);
  }
});


const filter = (req, file, cb)=>{
  if(file.mimetype.startsWith("image")){
    cb(null, true)
  }else{
    cb(new CustomError("Not an image! Please upload images only", 400), false);
  }
}
const upload = multer({storage:storage,
  limits:{
      fileSize: 1024 * 1024 * 4
  },
  fileFilter: filter
});

module.exports = upload;

