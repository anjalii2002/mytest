const express = require('express')

const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");

const RetailerRoute = express.Router();
const { postRetailer,getStatus,updateretailerstatus,getRetailer,updateRetailer,getTotalretailer} = require("../../Controller/Admin/tbl_retailer")


// aws config
let S3 = new AWS.S3({
    credentials: {
      accessKeyId: "",
      secretAccessKey: "",
    },
    region: "ap-south-1",
  });
  
  // // // multer config
  let upload = multer({
    storage: multerS3({
      bucket: "ebazar2",
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
  let multiuploads = upload.fields([{name:'registration_document',maxCount: 1},{name:'profile_photo',maxCount: '1'}])
RetailerRoute.post("/addretailer",multiuploads, postRetailer)
RetailerRoute.get("/viewretailer", getRetailer)
RetailerRoute.put("/updateretailer/:retailer_id",updateRetailer)
RetailerRoute.put("/retailerstatus",updateretailerstatus)

RetailerRoute.get("/totalretailer", getTotalretailer)
RetailerRoute.get("/getstatus", getStatus)
module.exports = {RetailerRoute}
