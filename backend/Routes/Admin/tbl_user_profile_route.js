const express = require('express')
const userProfileroute = express.Router();
const { updatePhoto,getUserProfile} = require("../../Controller/Admin/tbl_user_profile")

 
userProfileroute.put("/updatephoto/:user_id",updatePhoto)

userProfileroute.get("/viewuserprofile/:user_id",getUserProfile)

module.exports = {userProfileroute}