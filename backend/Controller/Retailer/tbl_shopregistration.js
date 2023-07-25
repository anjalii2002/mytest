const connection = require("../../Model/model");
const jwt= require('jsonwebtoken')
const { v4: uuidv4 } = require("uuid");
const cookieParser= require('cookie-parser')



const postRegistration = async (req, res) => {
  
    let userData = [
      req.body.retailer_id,
      req.body.shop_name,
      req.body.password,
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
      req.body.status,
    ];
    let sqlQuery =
      "INSERT INTO retailer_registration values(? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? , ? ,? ) ";

    await connection.query(sqlQuery, userData, function (error, result, field) {
      if (error) {
        return res.status(500).json({
          userData: null,
          message: error.message,
          status: false,
        });
      } else {
        const token = jwt.sign(
          { email: userData.email,  status: userData.status },
          "grhfghfhdfghrth45tbrt",
          {
            expiresIn: "1day",
          }
        );
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        
        return res
          .status(200)
          .cookie("token", token, options)
          .json({
            userData: {
              email: userData.email,
              
              status: userData.status,
            },
            message: "",
            status: true,
          });
      }
    });
  };

const Shopupdate = async (req, res) => {
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

const updateShopstatus = async (req, res) => {
  try {
    const userData = req.body.status;
    const id = req.params.retailer_id;
    let sqlQuery =
      "UPDATE retailer_registration SET status=? WHERE retailer_id=?";

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

const updateShoppassword = async (req, res) => {
  try {
    const userData = req.body.password;
    const id = req.params.retailer_id;
    let sqlQuery =
      "UPDATE retailer_registration SET password=? WHERE retailer_id=?";

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

const getLoginstatus = async function (req, res) {
  try {
    let { retailer_id, password } = req.body;
    console.log({ retailer_id, password });
    let sqlQuery =
      `SELECT * from retailer_registration where retailer_id="${retailer_id}"`;
    let a = await connection.query(
      sqlQuery,
      retailer_id,
      async function (error, result) {
        console.log("object ", a.sql);
        console.log("object ", result);

        if (error) {
          return res.json({ status: 400, response: error.message });
        }
        if (result.length == 0) {
          return res.json({ status: 400, response: "user not found " });
        }
        if (result[0].password == password) {
          if (result[0].status === "active") {

        // const options={
        //   expires:new Date(Date.now() +3*24 * 60 *60 *1000),
        //   httpOnly:true,
        // };
        // return res.status(200). cookie('token',token,options).json({status:200,reponse:result, user:token,retailer_id,shop_name:result[0].shop_name})
            const token = await jwt.sign({ retailer_id }, "anjali", {
              expiresIn: "15m",
            });
            return res.json({ status: 200, response: "user logged in" ,token, users: result[0],});
          } else {
            return res.json({
              status: 400,
              response: "your account is blocked please contact admin",
            });
          }
        } else {
          res.json({ status: 400, response: "invalid credential" });
        }
      }
    );
  } catch (error) {
    res.json({ status: 400, response: error.message });
  }
};

const viewOwner = async function(req, res){
  let id = req.query.retailer_id
  let sqlquery = "select owner_name from retailer_registration where retailer_id = ?";
 await connection.query(sqlquery, id, async function(error, result){
     if(error)
     console.log(error.sqlMessage);
     else
      return res.json(result);  
      console.log(result);
 })
}

// const getLoginstatus = async (req, res, next) => {
//   try {
//     const { retailer_id, password } = req.body;
//     let sqlQuery = `SELECT * FROM retailer_registration WHERE retailer_id="${retailer_id}"`;
//     await connection.query(sqlQuery, async (err, result) => {
//       if (err) {
//         return res.json({ Error: err.message });
//       }
//       if (result.length === 0) {
//         return res.json({ response: "Invalid user,please enter the correct credentials" });
//       }

//       const hashpwd = result[0].password;
//       const passwordCheck = await bcrypt.compare(password, hashpwd);
//       if (!passwordCheck) {
//         return res.json({ Error: "oops wrong passsword" });
//       }
//       if (result[0].status === 'deactive') {
//         res.send('your status is inactive please contact to admin')
//       }
//       else if (result[0].status === 'active') {
        
//         const token = await jwt.sign({ retailer_id }, "saurabhs singh", {
//           expiresIn: "15m",
//         });

//         res.json({
//           status: 200,
//           msg:"your'e account is active",
//           response: "logged in successfull",
//           token,
//           users: result[0],
//         });
//       }
    

//     });
//   } catch (err) {
//     res.json({ status: 400, response: err });
//   }
// };





module.exports = {
  postRegistration,
  Shopupdate,
  getLoginstatus,
  updateShopstatus,
  updateShoppassword,
  viewOwner,
};
