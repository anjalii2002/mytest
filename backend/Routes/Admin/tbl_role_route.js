const express = require('express')
const RoleRoute = express.Router();
const { postRole,updateRole,getRole} = require("../../Controller/Admin/tbl_role")

 
RoleRoute.post("/addrole", postRole)
RoleRoute.get("/viewrole", getRole)
RoleRoute.put("/updaterole/:role_id",updateRole)

module.exports = {RoleRoute}