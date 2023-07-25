const connection = require("../../Model/model");
// const bcrypt =require('bcrypt')



const getRetailer = async (req, res) => {
  try {
    let sqlQuery = "SELECT * FROM retailer_registration";

    await connection.query(sqlQuery, function (error, result, field) {
      if (error) {
        console.log(error.sqlMessage);
      } else {
        res.json(result);
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

const postRetailer = async (req, res) => {

  // const salt =await bcrypt.genSalt(10);
  // value=await bcrypt.hash(req.body.password, salt)

    try {
      let userData =[
       req.body.retailer_id,
        req.body.shop_name,
        // password: value,
        req.body.owner_name,
        req.body.registration_no,
        req.files.registration_document[0].location,
        req.files.profile_photo[0].location,
       req.body.gst_no,
      req.body.pan_no,
 req.body.address,
 req.body.state,
 req.body.city,
 req.body.pincode,
 req.body.contact_no,
 req.body.email,
 req.body.registration,
 req.body.status

      ];
      // let sqlQuery = "INSERT INTO retailer_registration ( retailer_id,shop_name,password,owner_name,registration_no,registration_document,profile_photo, gst_no,pan_no,address,state,city,pincode,contact_no,email) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )";
  let sqlQuery = "INSERT INTO  retailer_registration SET ?"
      await connection.query(sqlQuery, userData, function (error, result, field) {
        if (error) {
          console.log(error.sqlMessage);
        } else {
          res.json(result);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };


  const updateRetailer = async (req, res) => {
    try {
      const userData = req.body;
      const id = req.params.retailer_id;
      let sqlQuery = "UPDATE retailer_registration SET? WHERE retailer_id=?";
  
      await connection.query(
        sqlQuery,
        [userData, id],
        function (error, result, field) {
          if (error) {
            console.log(error.sqlMessage);
          } else {
            res.json(result);
          }
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const getTotalretailer = async (req, res) => {
    try {
      let sqlQuery = "SELECT COUNT (*) as shop FROM retailer_registration";
  
      await connection.query(sqlQuery, function (error, result, field) {
        if (error) {
          console.log(error.sqlMessage);
        } else {
          res.json(result);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };


  const updateretailerstatus = async (req, res) => {
    try {
      const userData = req.query.status;
      const id = req.query.retailer_id;
      let sqlQuery = "UPDATE retailer_registration SET status= ? WHERE retailer_id=?";
  
      await connection.query(
        sqlQuery,
        [userData, id],
        function (error, result, field) {
          if (error) {
            console.log(error.sqlMessage);
          } else {
            res.send("status changed");
          }
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };


  const getStatus = async (req, res) => {
    try {
      let sqlQuery = "SELECT status,COUNT (*) as restatus FROM retailer_registration group by status";
  
      await connection.query(sqlQuery, function (error, result, field) {
        if (error) {
          console.log(error.sqlMessage);
        } else {
          res.json(result);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };
    module.exports={getRetailer,getStatus, updateretailerstatus,postRetailer, updateRetailer, getTotalretailer}