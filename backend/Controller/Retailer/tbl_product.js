const connection = require("../../Model/model");
// const Addproduct = async (req, res) => {
//   try {
//     let userData = [
//       req.body.product_id,
//       req.body.retailer_id,
//       req.body.item_name,
//       req.body.company,
//       req.body.price,
//       req.body.subcategory_id,
//       req.body.available_quantity,
//       req.file.location,
//       req.body.color,

//     ];

//     let sqlQuery = "INSERT INTO product SET ?"

//     await connection.query(sqlQuery, userData, function (error, result, field) {
//       if (error) {
//         console.log(error.sqlMessage);
//       } else {
//         res.json(result);
//       }
//     });
//   } catch (err) {
//     console.log(err.message);
//   }
// };

const Addproduct = async (req, res) => {
  try {
    let userData = {
      product_id: req.body.product_id,
      retailer_id: req.query.retailer_id,
      price: req.body.price,
      available_quantity: req.body.available_quantity,
      subcategory_id: req.body.subcategory_id,
      item_name: req.body.item_name,
      company: req.body.company,
      image: req.file.location,
      color: req.body.color,
    };
    console.log(userData, "samm");
    let sqlQuery = "INSERT INTO product SET ?";

    await connection.query(sqlQuery, userData, (error, result) => {
      // console.log(result, "anjali");
      if (error) {
        return res.send({ status: 400, Error: error.sqlMessage });
      }
        res.send({ status: 200, response: result });
    });
  } catch (err) {
    return res.send({ status: 400, Error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const userData ={
     retailer_id :req.body.retailer_id,
    //  product_id:req.body.product_id,
     price:req.body.price,
     available_quantity:req.body.available_quantity,
     subcategory_id : req.body.subcategory_id,
     item_name:req.body.item_name,
     company: req.body.company,
     image: req.file.location
     } ;
    const id = req.params.product_id;
    let sqlQuery = "UPDATE product SET? WHERE product_id=?";

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
const getProduct = async (req, res) => {
  try {
    let id=req.params.retailer_id;
    let sqlQuery = "SELECT * FROM product where retailer_id = ? "                                   

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



const getDescription = async (req, res) => {
  try {
    let id= req.params.product_id;
    console.log(id)
    let sqlQuery = "SELECT * FROM product_description where product_id = ? "                                   

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




const Adddescription = async (req, res) => {
  try {
    let userData = {
      product_id: req.body.product_id,
     description:req.body.description,

     
      color: req.body.color,
      size:req.body.size,
      weight:req.body.weight,
      manufacturing_date:req.body.manufacturing_date,
      expiry_date:re.body.expiry_date
    };
    console.log(userData, "samm");
    let sqlQuery = "INSERT INTO product_description SET ?";

    await connection.query(sqlQuery, userData, (error, result) => {
      // console.log(result, "anjali");
      if (error) {
        return res.send({ status: 400, Error: error.sqlMessage });
      }
        res.send({ status: 200, response: result });
    });
  } catch (err) {
    return res.send({ status: 400, Error: err.message });
  }
};
module.exports = { Addproduct, updateProduct, getProduct,getDescription,Adddescription };
