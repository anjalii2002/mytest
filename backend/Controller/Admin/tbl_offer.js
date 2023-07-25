const connection = require("../../Model/model");
const postOffer = async (req, res) => {
  try {
    let userData = req.body;
    let sqlQuery = "INSERT INTO offer SET ?";

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

const updateOffer = async (req, res) => {
  try {
    const userData = req.body;
    const id = req.params.offer_id;
    let sqlQuery = "UPDATE offer SET? WHERE offer_id=?"

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

const getOffer = async (req, res) => {
  try {
    let sqlQuery = "SELECT * FROM offer";

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


const updateofferstatus = async (req, res) => {
  try {
    const userData = req.query.status;
    const id = req.query.offer_id;
    let sqlQuery = "UPDATE offer SET status= ? WHERE offer_id=?";

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

module.exports = { postOffer,updateofferstatus, updateOffer, getOffer };
