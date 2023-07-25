const express = require("express");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");

const ShopRegistrationroute = express.Router();
const {
 
  postRegistration,getLoginstatus,Shopupdate,updateShopstatus,updateShoppassword,viewOwner
} = require("../../Controller/Retailer/tbl_shopregistration");

// aws config
let S3 = new AWS.S3({
  credentials: {
    accessKeyId: "AKIAQAX7DH5LUBXOOFW3",
    secretAccessKey: "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",
  },
  region: "ap-south-1",
});

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

let multiuploads = upload.fields([{name:'registration_document',maxCount: 1},{name:'profile_photo',maxCount: '1'}])

ShopRegistrationroute.post("/shopregistration",multiuploads, postRegistration);
ShopRegistrationroute.patch("/shopupdate/:retailer_id", Shopupdate);
ShopRegistrationroute.patch("/updateshopstatus/:retailer_id", updateShopstatus);
ShopRegistrationroute.patch("/updateshoppassword/:retailer_id", updateShoppassword);
ShopRegistrationroute.post("/login", getLoginstatus);
ShopRegistrationroute.get("/viewowner",viewOwner)


module.exports = { ShopRegistrationroute };