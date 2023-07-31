const express = require("express")
// const dotenv= require("dotenv")
// dotenv.config()
const AWS= require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path")

const CategoryRoute = express.Router();
const {
  getCategory,
  updateCategory,
  postCategory,
} = require("../../Controller/Admin/tbl_category");


// aws config

let S3= new AWS.S3({
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
}, 
  region: "ap-south-1",
});

 
// const awsConfig={
  
//   accesskeyId: "AKIAQAX7DH5LUBXOOFW3",
//   // accessKeyId: "AKIAQAX7DH5L6XODE5PY",
//   secretAccessKey: "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",
//   // secretAccessKey: "xaMQyqnQCHwq3vPxkcxxfDEL1HWycnupfKqQDoWT",
//   region: "ap-south-1",
//   // bucketName: "awscategory"
//   };
//  const S3 = new AWS.S3(awsConfig);
// console.log(S3)

// // // multer config
let upload= multer({
  storage: multerS3 ({
    bucket: "ebazar2",
    s3: S3,
    // contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata : (req,file,cb)=>{
      cb(null,{fieldName: file.fieldname});
    },
    acl :'public-read',
    key: (req,file,cb)=> cb(null, `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`)
  })
})




CategoryRoute.post("/addnewcategory",upload.single("category_image"), postCategory);
CategoryRoute.put("/updatecategory/:category_id",upload.single("category_image"), updateCategory);
CategoryRoute.get("/categorylist", getCategory);



module.exports = { CategoryRoute };
