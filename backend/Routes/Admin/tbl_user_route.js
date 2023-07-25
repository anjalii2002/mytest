const express = require('express')
const UserRoute = express.Router();
const { getUser,Revokerole ,getStatus,getTotaluser,updateUser,updateUserpassword,postUser,ViewUser,updateUserstatus } = require("../../Controller/Admin/tbl_user")

 UserRoute.get("/userlist", getUser)
 UserRoute.get("/viewuser/:user_id", ViewUser)
 UserRoute.post("/adduser", postUser)
UserRoute.delete("/revoke",Revokerole )
 UserRoute.put("/userstatus",updateUserstatus)
UserRoute.put("/usermodify/:user_id",updateUser)
UserRoute.patch("/userpassword/:user_id",updateUserpassword)
UserRoute.get("/totaluser",getTotaluser)
UserRoute.get("/status", getStatus)

module.exports = {UserRoute}