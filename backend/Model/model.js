var mysql=require('mysql');
var connection=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    port:3306,
    database:"e_bazar"
})
connection.connect((err)=>{
    if(err){
        console.log(err.sqlMessage)
    }
    else{
        console.log("Connected......")
    }
})
module.exports = connection;