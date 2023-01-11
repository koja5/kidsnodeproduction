const express = require("express");
const mysql = require("mysql");
const logger = require("../config/logger");
const request = require("request");
const fs = require("fs");

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

function sendChildrenInvoice() {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }
      conn.query(
        "select *, i.id as 'id_invoice', k.email as 'kindergarden_email', p1.firstname as 'father_name', cs.price from invoice_children i join childrens c on i.children_id = c.id join kindergarden_general_info k on i.kindergarden_id = k.kindergarden_id join parents p1 on c.father_id = p1.id join parents p2 on c.mother_id = p2.id join children_setting cs on c.id = cs.children_id  where MONTH(i.creation_date) = MONTH(CURRENT_DATE())",
        function (err, rows) {
          try {
            console.log(rows);
            if (rows) {
              var config = JSON.parse(
                fs.readFileSync("./server/mail_server/config.json", "utf-8")
              );
              rows.forEach(function (to, i, array) {
                var body = JSON.parse(JSON.stringify(config));
                body.send_children_invoice.fields["email"] =
                  to.kindergarden_email;
                body.send_children_invoice.fields["greeting"] =
                  body.send_children_invoice.fields["greeting"].replace(
                    "{firstname}",
                    to.father_name
                  );
                body.send_children_invoice.fields["text"] =
                  body.send_children_invoice.fields["text"].replace(
                    "{month}",
                    new Date(to.creation_date).getMonth() +
                      1 +
                      "." +
                      new Date(to.creation_date).getFullYear()
                  );
                body.send_children_invoice.fields["text"] =
                  body.send_children_invoice.fields["text"].replace(
                    "{firstname}",
                    to.firstname
                  );
                body.send_children_invoice.fields["text"] =
                  body.send_children_invoice.fields["text"].replace(
                    "{lastname}",
                    to.lastname
                  );
                body.send_children_invoice.fields["payee"] = to.name;
                body.send_children_invoice.fields["price"] = to.price;
                body.send_children_invoice.fields["account_number"] =
                  to.account_number;
                body.send_children_invoice.fields["id_invoice"] = to.id_invoice;
                var options = {
                  url: process.env.link_api + "mail-server/sendMail",
                  method: "POST",
                  body: body.send_children_invoice,
                  json: true,
                };
                request(options, function (error, response, body) {});
              });
            }
          } catch (ex) {
            logger.log("error", ex);
          }
        }
      );
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
}

module.exports = sendChildrenInvoice;
