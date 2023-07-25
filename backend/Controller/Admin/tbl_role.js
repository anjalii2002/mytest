const connection = require("../../Model/model");
const postRole = async (req, res) => {
  try {
    let userData = req.body;
    let sqlQuery = "INSERT INTO role SET ?";

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

const updateRole = async (req, res) => {
  try {
    const userData = req.body;
    const id = req.params.role_id;
    let sqlQuery = "UPDATE role SET? WHERE role_id=?";

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
const getRole = async (req, res) => {
  try {
    let sqlQuery = "SELECT * FROM role";

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
}

module.exports = { postRole, updateRole,getRole };
