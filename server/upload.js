require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const expiresToken = "12h";
const jwt = require("jsonwebtoken");
const auth = require("./config/auth");
const logger = require("./config/logger");
const verifyToken = require("./config/auth");
const bodyParser = require("body-parser");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({
  uploadDir: "./server/file_uploads",
  auth,
});
const path = require("path");
const fs = require("fs");

var connection = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

connection.getConnection(function (err, conn) {});

/* GET api listing. */
router.get("/", (req, res) => {
  res.send("upload works");
});

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// DOCUMENT ON CHILDREN PROFILE

router.post("/saveChildrenDocument", multipartMiddleware, (req, res) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        console.error("SQL Connection error: ", err);
        res.json({
          code: 100,
          status: err,
        });
      } else {
        const document = {
          children_id: req.body.id,
          name: req.files.UploadFiles.name,
          type: req.files.UploadFiles.type,
          path: req.files.UploadFiles.path,
        };
        conn.query(
          "insert into children_documents set ?",
          [document],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
            } else {
              res.json(true);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
  res.json({
    message: "File uploaded successfully",
  });
});

router.get("/getChildrenDocuments/:id", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from children_documents where children_id = ?",
          [req.params.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/deleteChildrenDocument", auth, (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", "SQL Connection error: ", err);
        res.json({
          code: 100,
          status: err,
        });
      } else {
        conn.query(
          "delete from children_documents where id = ?",
          [req.body.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
            } else {
              fs.unlinkSync(req.body.path);
              res.json(true);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/getDocument", async (req, res, next) => {
  req.body.path = req.body.path.toString().replace("server\\", "");
  filepath = path.join(__dirname, req.body.path);
  res.sendFile(filepath, {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachement; filename="test.pdf"`,
    },
  });
});

router.post("/getImage", async (req, res, next) => {
  console.log(req.body);
  if (req.body.path !== "null") {
    req.body.path = req.body.path.toString().replace("server\\", "");
    filepath = path.join(__dirname, req.body.path);
    res.sendFile(filepath);
  } else {
    res.send(null);
  }
});

// END DOCUMENT ON CHILDREN PROFILE

// GENERAL CONTRACT

router.post("/saveGeneralContract", multipartMiddleware, (req, res) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        console.error("SQL Connection error: ", err);
        res.json({
          code: 100,
          status: err,
        });
      } else {
        const document = {
          kindergarden_id: 2,
          name: req.files.UploadFiles.name,
          type: req.files.UploadFiles.type,
          path: req.files.UploadFiles.path,
        };
        conn.query(
          "insert into general_contract_documents set ?",
          [document],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
            } else {
              res.json(true);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/getGeneralContracts", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from general_contract_documents where kindergarden_id = ?",
          [req.user.user.kindergarden],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/deleteGeneralContract", auth, (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", "SQL Connection error: ", err);
        res.json({
          code: 100,
          status: err,
        });
      } else {
        conn.query(
          "delete from general_contract_documents where id = ?",
          [req.body.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
            } else {
              fs.unlinkSync(req.body.path);
              res.json(true);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

// END GENERAL CONTRACT

// DOCUMENT ON EMPLOYEE PROFILE

router.post("/saveEmployeeDocument", multipartMiddleware, (req, res) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        console.error("SQL Connection error: ", err);
        res.json({
          code: 100,
          status: err,
        });
      } else {
        const document = {
          employee_id: req.body.id,
          name: req.files.UploadFiles.name,
          type: req.files.UploadFiles.type,
          path: req.files.UploadFiles.path,
        };
        conn.query(
          "insert into employee_documents set ?",
          [document],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
            } else {
              res.json(true);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/getEmployeeDocuments/:id", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from employee_documents where employee_id = ?",
          [req.params.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/deleteEmployeeDocument", auth, (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", "SQL Connection error: ", err);
        res.json({
          code: 100,
          status: err,
        });
      } else {
        conn.query(
          "delete from employee_documents where id = ?",
          [req.body.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
            } else {
              fs.unlinkSync(req.body.path);
              res.json(true);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

// END DOCUMENT ON EMPLOYEE PROFILE

// UPLOAD KINDERGARDEN LOGO

router.post("/uploadKindergardenLogo", multipartMiddleware, (req, res) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        console.error("SQL Connection error: ", err);
        res.json({
          code: 100,
          status: err,
        });
      } else {
        const body = {
          kindergarden_id: 2,
          logo: req.files.UploadFiles.path,
        };
        conn.query(
          "update kindergardens set logo = ? where id = ?",
          [body.logo, body.kindergarden_id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
            } else {
              res.json(true);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

// UPLOAD KINDERGARDEN LOGO END

// UPLOAD OWNER LOGO

router.post("/uploadOwnerLogo", multipartMiddleware, (req, res) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        console.error("SQL Connection error: ", err);
        res.json({
          code: 100,
          status: err,
        });
      } else {
        const body = {
          kindergarden_id: 3,
          logo: req.files.UploadFiles.path,
        };
        conn.query(
          "update owners set logo = ? where id = ?",
          [body.logo, body.kindergarden_id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(false);
            } else {
              res.json(true);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

// UPLOAD OWNER LOGO END

module.exports = router;
