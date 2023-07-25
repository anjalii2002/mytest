const connection = require("../../Model/model");

const postRoleassign = async (req, res) => {
  try {
    let userData = req.body;
    let sqlQuery = "INSERT INTO role_assign SET ?";

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

const getAssignedroles = async (req, res) => {
  try {
    let userData = req.params.role_id;
    let sqlQuery = "SELECT * FROM role  WHERE role_id =?";

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

const deleteAssignedrole = async (req, res) => {
  try {
    let userid = req.params.role_id;
    let sqlQuery = "DELETE FROM role_assign WHERE user_id =? & role_id=?";
    await connection.query(sqlQuery, userid, function (error, result, fields) {
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

module.exports = { postRoleassign, getAssignedroles, deleteAssignedrole };
