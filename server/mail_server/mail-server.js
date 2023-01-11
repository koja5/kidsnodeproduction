require("dotenv").config();
var express = require("express");
var nodemailer = require("nodemailer");
var router = express.Router();
var hogan = require("hogan.js");
var fs = require("fs");
const logger = require("../config/logger");

/*var smtpTransport = nodemailer.createTransport({
  host: process.env.smtp_host,
  port: process.env.smtp_port,
  secure: process.env.smtp_secure,
  tls: {
    rejectUnauthorized: process.env.smtp_rejectUnauthorized,
  },
  auth: {
    user: process.env.smtp_user,
    pass: process.env.smtp_pass,
  },
});*/

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "akojicpmf@gmail.com",
    pass: "vrbovac12345",
  },
});

router.post("/sendMail", function (req, res) {
  var confirmTemplate = fs.readFileSync(
    "./server/mail_server/templates/" + req.body.template,
    "utf-8"
  );
  var compiledTemplate = hogan.compile(confirmTemplate);
  var mailOptions = {
    from: req.body?.sender
      ? '"' + req.body.sender + '"' + process.env.smtp_user
      : '"KidsNode"' + process.env.smtp_user,
    to: "kojaaa95@gmail.com",
    subject: req.body.subject,
    html: compiledTemplate.render(req.body.fields),
  };

  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      logger.log("error", `${req.body.email}: ${error}`);
      res.end(false);
    } else {
      logger.log(
        "info",
        `Sent mail for VERIFICATION MAIL for USER: ${req.body.shortname} on EMAIL: ${req.body.email}`
      );
      res.end(true);
    }
  });
});

module.exports = router;
