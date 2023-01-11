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

function childrenDailyNotification() {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err);
        res.json(err);
      }
      conn.query(
        "select c.firstname, c.lastname, p1.firstname as 'father_name', cn.note, cn.creation_date from children_notes cn join childrens c on cn.children_id = c.id join parents p1 on c.father_id = p1.id join parents p2 on c.mother_id = p2.id where DAY(cn.creation_date) = DAY(CURRENT_DATE()) AND MONTH(cn.creation_date) = MONTH(CURRENT_DATE()) AND YEAR(cn.creation_date) = YEAR(CURRENT_DATE())",
        function (err, rows) {
          try {
            if (rows) {
              var config = JSON.parse(
                fs.readFileSync("./server/mail_server/config.json", "utf-8")
              );
              rows.forEach(function (to, i, array) {
                var body = JSON.parse(JSON.stringify(config));
                body.children_daily_notification.fields["greeting"] =
                  body.children_daily_notification.fields["greeting"].replace(
                    "{firstname}",
                    to.father_name
                  );
                body.children_daily_notification.fields["text"] =
                  body.children_daily_notification.fields["text"].replace(
                    "{date}",
                    to.creation_date.getUTCDate() +
                      "." +
                      (Number(to.creation_date.getUTCMonth()) + 1) +
                      "." +
                      to.creation_date.getUTCFullYear()
                  );
                body.children_daily_notification.fields["text"] =
                  body.children_daily_notification.fields["text"].replace(
                    "{firstname}",
                    to.firstname
                  );
                body.children_daily_notification.fields["text"] =
                  body.children_daily_notification.fields["text"].replace(
                    "{lastname}",
                    to.lastname
                  );
                body.children_daily_notification.fields["note"] = to.note;
                var options = {
                  url: process.env.link_api + "mail-server/sendMail",
                  method: "POST",
                  body: body.children_daily_notification,
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
    logger.log("error", ex);
    res.json(ex);
  }
}

module.exports = childrenDailyNotification;
