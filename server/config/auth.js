const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  let token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["cookie"];
  if (token.startsWith("token")) {
    token = token.toString().split("=")[1];
    var lastChar = token[token.length - 1];
    if (lastChar === ";") {
      token = token.substring(0, token.length - 1);
    }
  } else {
    const itemCookie = token.toString().split(" ");
    for (let i = 0; i < itemCookie.length; i++) {
      if (itemCookie[i].startsWith("token")) {
        token = itemCookie[i].toString().split("=")[1];
        var lastChar = token[token.length - 1];
        if (lastChar === ";") {
          token = token.substring(0, token.length - 1);
        }
      }
    }
  }

  if (!token) {
    res.clearCookie("token");
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    res.clearCookie("token");
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
