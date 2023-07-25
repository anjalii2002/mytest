const connection = require("../../Model/model");
const postCategory = async (req, res) => {
  try {

    let userData=[
      req.body.category_id,
      req.body.category_name,
      req.file.location,
      req.body.gst,
    ]
    let sqlQuery = "INSERT INTO category (category_id, category_name, category_image, gst) VALUES(?,?,?,?)";

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

const updateCategory = async (req, res) => {
  try {
    console.log("req.file",req.file.location)
    const userData = {
      category_name:req.body.category_name,
      category_image:req.file.location,
      
    };
    const id = req.params.category_id;
    let sqlQuery = "UPDATE category SET? WHERE category_id=?";

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

const getCategory = async (req, res) => {
  try {
    let sqlQuery = "SELECT * FROM category";

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

module.exports = { postCategory, updateCategory, getCategory };
