const express = require('express')
const CustomerRoute = express.Router();
const { getStatus,getTotalcustomer,getCustomer, updateCustomer,updatecustomerstatus} = require("../../Controller/Admin/tbl_customer")

 

CustomerRoute.get("/viewstatus", getStatus)
CustomerRoute.get("/viewcustomer", getCustomer)
CustomerRoute.put("updatestatus",updatecustomerstatus)
CustomerRoute.put("/updatecustomer/:customer_id",updateCustomer)
CustomerRoute.get("/totalcustomer", getTotalcustomer)

module.exports = {CustomerRoute}
