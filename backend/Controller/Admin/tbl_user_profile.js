const connection = require("../../Model/model");

const updatePhoto = async (req, res) => {
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


const getUserProfile = async (req, res) => {
  try {
    let userData = req.params.user_id;
    let sqlQuery = "SELECT * FROM user_profile  WHERE user_id=?";
    
    await connection.query(sqlQuery,userData, function (error, result, field) {
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

module.exports = { updatePhoto, getUserProfile };
