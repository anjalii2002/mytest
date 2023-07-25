const bcrypt = require('bcrypt')
const connection = require("../../Model/model");




const getUser = async (req, res) => {
  try {
    let sqlQuery = "SELECT * FROM users";

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

const updateUser = async (req, res) => {
  try {
    const userData = req.body;
    const id = req.params.user_id;
    let sqlQuery = "UPDATE users SET? WHERE user_id=?";

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

const updateUserpassword = async (req, res) => {
  try {
    const userData = req.body.password;
    const id = req.params.user_id;
    let sqlQuery = "UPDATE users SET password=? WHERE user_id=?";

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

const postUser = async (req, res) => {
  
    const salt =await bcrypt.genSalt(10);
    value = await bcrypt.hash(req.body.password, salt)

    let userData = {
      user_id: req.body.user_id,
      name: req.body.name,
      password : value}

      let sqlQuery = "INSERT INTO users SET ?";

    await connection.query(sqlQuery, [userData], function (error, result, field) {
      if (error) {
        console.log(error.sqlMessage);
      } else {
        res.json(result);
      }
    });}

    const ViewUser = async (req, res) => {
      try {
        const id = req.params.user_id;
        let sqlQuery = "SELECT role_id ,role_name FROM role NATURAL JOIN role_assign WHERE user_id=?";
    
        await connection.query(sqlQuery,[id], function (error, result, field) {
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

    const updateUserstatus = async (req, res) => {
      try {
        const userData = req.query.status;
        const id = req.query.user_id;
        let sqlQuery = "UPDATE users SET status= ? WHERE user_id=?";
    
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


    const getTotaluser = async (req, res) => {
      try {
        let sqlQuery = "SELECT COUNT (*) as name FROM users";
    
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

   

    const getStatus = async (req, res) => {
      try {
        let sqlQuery = "SELECT status,COUNT (*) as totalstatus FROM users group by status";
    
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

    const Revokerole = async (req, res) => {
      try {
        console.log('ryegysby')
          let data = [
            req.query.user_id,
            req.query.role_id
          ]
          console.log(data);
          // console.log(role_id,'hhhhh')
          let sqlQuery = `DELETE FROM role_assign WHERE user_id = ? AND role_id=?`;
         
          await connection.query(sqlQuery, data, (error, result, fields) => {
              if (error) {
                  console.log( error.sqlMessage)
              }
              else{
                  res.json(result)
              }
          })
  
      }
      catch(error){
          console.log(error.message)
      }
      
  };



  


module.exports = { getUser,getTotaluser ,getStatus,Revokerole , updateUser, updateUserpassword,postUser,ViewUser ,updateUserstatus}
