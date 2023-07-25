const connection = require("../../Model/model");

const postBanking = async (req, res) => {
    try {
      let userData = req.body;
      const id=req.query.retailer_id
      let sqlQuery = "INSERT INTO retailer_banking VALUES(?,?,?,?,?,?)";
  
      await connection.query(sqlQuery, [userData,id], function (error, result, field) {
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

  const updateBanking = async (req, res) => {
    try {
      const userData = req.body;
      const id = req.params.retailer_id;
      let sqlQuery = "UPDATE retailer_banking SET? WHERE retailer_id=?";
  
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


  const getBanking = async (req, res) => {
    try {
      let id=req.params.retailer_id;
      let sqlQuery = "SELECT * FROM retailer_banking where retailer_id = ? "                                   
  
      await connection.query(sqlQuery,id, function (error, result, field) {
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


  module.exports={postBanking,updateBanking, getBanking }