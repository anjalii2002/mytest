const express = require("express");
const BankingRoute = express.Router();
const {
 
  postBanking,updateBanking,getBanking
} = require("../../Controller/Retailer/tbl_retailer_banking");
BankingRoute.post("/addbanking", postBanking);
BankingRoute.patch("/banking/:retailer_id", updateBanking);
BankingRoute.get("/viewbanking/:retailer_id", getBanking)

module.exports={BankingRoute}