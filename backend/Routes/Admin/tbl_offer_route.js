const express = require('express')
const Offerroute = express.Router();
const { updateofferstatus,postOffer,updateOffer,getOffer} = require("../../Controller/Admin/tbl_offer")


Offerroute.post("/createnewoffer", postOffer)
Offerroute.put("/updateoffer/:offer_id",updateOffer)
Offerroute.get("/viewofferlist",getOffer)
Offerroute.put("/offerstatus",updateofferstatus)

module.exports = {Offerroute}