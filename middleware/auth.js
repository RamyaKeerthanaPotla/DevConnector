const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");

  //check if no token
  if (!token) {
    res.status(401).json({ msg: "No Token, authorization denied" });
  }

  //verify token
  try {
    const decodedToken = jwt.verify(token, config.get("jwtSecret"));
    req.user = decodedToken.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
