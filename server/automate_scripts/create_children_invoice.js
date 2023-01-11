const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const logger = require("../config/logger");

var connection = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

function createChildrenInvoice() {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query("select * from childrens", function (err, rows) {
        try {
          if (rows) {
            var values = "";
            rows.forEach(function (to, i, array) {
              const item = "(" + to.id + "," + to.kindergarden_id + "),";
              values += item;
            });
            values = values.slice(0, -1);
            conn.query(
              "insert into invoice_children(children_id, kindergarden_id) values " +
                values,
              function (err, rows) {
                conn.release();
                logger.log("info", "Successfuly created children invoices!");
              }
            );
          }
        } catch (ex) {
          logger.log("error", err);
        }
      });
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
}

module.exports = createChildrenInvoice;
