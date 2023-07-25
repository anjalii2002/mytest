const express = require('express')
const Productroute = express.Router();

const AWS= require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path")
const { Addproduct,updateProduct,getProduct,getDescription,Adddescription } = require("../../Controller/Retailer/tbl_product")


// aws config
let S3 = new AWS.S3({
    credentials: {
      accessKeyId: "AKIAVL6CUUUQILQZ7ZN4",
      secretAccessKey: "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",
    },
    region: "ap-south-1",
  });
  
  // // // multer config
  let upload = multer({
    storage: multerS3({
      bucket: "ecoms3",
      s3: S3,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      acl: "public-read",
      key: (req, file, cb) =>
        cb(
          null,
          `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`
        ),
    }),
  });

// const storage = multer.diskStorage({
//     destination: "./uploads",
//     filename: function (req, file, cb) {
//       return cb(
//         null,
//         `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//       );
//     },
//   });
//   const upload = multer({ storage: storage });
  
 
Productroute.post("/addproduct", upload.single("image"),Addproduct)
Productroute.get("/viewproduct/:retailer_id", getProduct)
Productroute.put("/updateproduct/:product_id",upload.single('image'),updateProduct)
Productroute.get("/viewdescription/:product_id", getDescription)
Productroute.post("/adddescription", Adddescription)
module.exports = {Productroute}