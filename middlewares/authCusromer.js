const jwt = require("jsonwebtoken");
const { promisify } = require("util");

async function auth(req, res, next) {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ message: "login required" });
  }
  try {
    let decode = await promisify(jwt.verify)(authorization, "PASS_word");
    next();

  } catch (e) {
    return res.status(401).json({ message: "login failed" });
  }
}

module.exports = { auth };
