const express = require('express')
const roleAssignroute = express.Router();
const {postRoleassign ,getAssignedroles,deleteAssignedrole} = require("../../Controller/Admin/tbl_role_assign")

 
roleAssignroute.post("/assignroletouser", postRoleassign)
roleAssignroute.get("/getassignedroles/:role_id",getAssignedroles)
roleAssignroute.delete("/revokeole/:user_id/:role_id",deleteAssignedrole)


module.exports = {roleAssignroute}