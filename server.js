const express = require("express");
const app = require("./server/config/app");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const api = require("./server/api");
const upload = require("./server/upload");
const controlPanel = require("./server/control-panel");
const mailServer = require("./server/mail_server/mail-server");
const schedule = require("node-schedule");

//AUTOMATE SCRIPTS
const createChildrenInvoice = require("./server/automate_scripts/create_children_invoice");
const sendChildrenInvoice = require("./server/automate_scripts/send_children_invoice");
const childrenDailyNotification = require("./server/automate_scripts/children_daily_notification");
//END AUTOMATE SCRIPTS

app.use(function (req, res, next) {
  //allow cross origin requests
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, PUT, OPTIONS, DELETE, GET"
  );
  res.header("Access-Control-Allow-Origin", "http://localhost:4201");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Parsers for POST data
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static(path.join(__dirname, 'src')));

app.use("/api", api);
app.use("/api/upload", upload);
app.use("/api/control-panel", controlPanel);
app.use("/api/mail-server", mailServer);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

const port = process.env.PORT || "3001";
app.set("port", port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));

// AUTOMATE WORK

schedule.scheduleJob("15 36 23 * * *", function () {
  createChildrenInvoice();
});

schedule.scheduleJob("15 01 16 * * *", function () {
  sendChildrenInvoice();
});

schedule.scheduleJob("42 14 * * *", function () {
  childrenDailyNotification();
});
