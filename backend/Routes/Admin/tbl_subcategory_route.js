const express = require("express");

const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");

const subCategoryroute = express.Router();
const {
  postSubcategory,
  updateSubcategory,
  getSubcategory,
} = require("../../Controller/Admin/tbl_subcategory");

// aws config
let S3 = new AWS.S3({
  credentials: {
    accessKeyId: "AKIAQAX7DH5LUBXOOFW3",
    secretAccessKey: "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",
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

subCategoryroute.post(
  "/addsubcategory",
  upload.single("subcategory_image"),
  postSubcategory
);
subCategoryroute.put("/updatesubcategory/:subcategory_id",upload.single("subcategory_image"), updateSubcategory);
subCategoryroute.get("/viewsubcategory", getSubcategory);

module.exports = { subCategoryroute };
