const mysql = require("mysql");

var connection = mysql.createPool({
  host: "185.178.193.141",
  user: "appproduction.",
  password: "jBa9$6v7",
  database: "kidsnode",
});

/*var connection = mysql.createPool({
    host: "116.203.85.82",
    user: "appproduction_kids",
    password: "Iva#$2019Iva#$",
    database: "appproduction_kidsnode",
  });*/

exports.connect = () => {
  connection.getConnection(function (err, conn) {});
};
