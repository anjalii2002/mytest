const connection = require("../../Model/model");
const postSubcategory = async (req, res) => {
  try {
    let userData = [
      req.body.category_id,
      req.body.subcategory_id,
      req.body.subcategory_name,
      req.file.location,
    ];
    let sqlQuery =
      "INSERT INTO sub_category (category_id, subcategory_id, subcategory_name, subcategory_image) VALUES(?,?,?,?)";

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

const updateSubcategory = async (req, res) => {
  try {
    console.log("req.file",req.file.location)
    const userData = {
      subcategory_name:req.body.subcategory_name,
      subcategory_image:req.file.location,
      
    };
    const id = req.params.subcategory_id;
    let sqlQuery = "UPDATE sub_category SET? WHERE subcategory_id=?";

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

const getSubcategory = async (req, res) => {
  try {
    let sqlQuery = "SELECT * FROM sub_category";

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

module.exports = { postSubcategory, updateSubcategory, getSubcategory };
