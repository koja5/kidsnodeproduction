const express = require("express");
const router = express.Router();
require('./sql-database').connect();
// const express = require("express");

const app = express();

app.use(express.json());

module.exports = app;
