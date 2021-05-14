var mysql = require("mysql");
var crypto = require('crypto'); 
 const environment =require('dotenv').config({ path: './.env' }); 
// const decrypt=(text) =>{
//   var decipher = crypto.createDecipher('des-256-ctr','2d2kawoxw')
const decrypt=(text) =>{
  // var dec = decipher.update(text,'hex','utf8')
  // dec += decipher.final('utf8');
  var decipher = crypto.createDecipher('aes-256-ctr','2d2kawoxw')
  // return dec;
  // }
    // var dec = decipher.update(text,'hex','utf8')
  //   var decipher = crypto.createDecipher('des-256-ctr','2d2kawoxw')
  //   var decipher = crypto.createDecipher('des-256-ctr','2d2kawoxw')
  // }
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  // return dec;
  // }
  return dec;
  } 
  
  var log='password';
  // return dec;
  //   var decipher = crypto.createDecipher('des-256-ctr','2d2kawoxw')
  //   var decipher = crypto.createDecipher('des-256-ctr','2d2kawoxw')
  var dwp=decrypt(process.env.ps); 
  //   var decipher = crypto.createDecipher('des-256-ctr','2d2kawoxw')
  //   var decipher = crypto.createDecipher('des-256-ctr','2d2kawoxw')
  // }

var db;

var dbfunction=function(){} 
dwp=decrypt(process.env.ps);
dbfunction.prototype.connectDatabase=function(callback) { 
  if (!db) {
    db = mysql.createConnection({
      host: "localhost", 
      port: "3306",
      user: "root",    
      pass:"surana!23",
      database: "surananew", 
      multipleStatements: true,
      dateStrings: "Date" ,
      [log]:dwp
    });
    db.connect(function(err) {
      if (!err) {
        // console.log("Database is connected!");
        callback(null,db);

      } else {  
        callback("Error connecting database!",null);
        // console.log("Error connecting database!");
        
      }
    });
  }
  // return db; 
}

module.exports = new dbfunction();
