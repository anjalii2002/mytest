const connection = require("../../Model/model");

const getCustomer = async (req, res) => {
  try {
    let sqlQuery = "SELECT * FROM customer";

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

const updateCustomer = async (req, res) => {
  try {
    const userData = req.body;
    const id = req.params.customer_id;
    let sqlQuery = "UPDATE customer SET? WHERE customer_id=?";

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

const updatecustomerstatus = async (req, res) => {
  try {
    const userData = req.query.status;
    const id = req.query.customer_id;
    let sqlQuery = "UPDATE customer SET status= ? WHERE customer_id=?";

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

const getTotalcustomer = async (req, res) => {
  try {
    let sqlQuery = "SELECT COUNT (*) as custom FROM customer";

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
    let sqlQuery = "SELECT status,COUNT (*) as cusstatus FROM customer group by status";

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

module.exports = {
  getCustomer,
  updatecustomerstatus,
  updateCustomer,
  getTotalcustomer,
  getStatus
};
