const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config/config.env" });

const auth = (req, res, next) => {
  let publicURLS = [{ url: "/api/auth/", method: "POST" }];

  let isPublic = false;

  for (var i = 0; i < publicURLS.length; i++) {
    const { url, method } = publicURLS[i];
    if (req.url.includes(url) && req.method === method) {
      isPublic = true;
      break;
    }
  }

  if (isPublic) {
    next();
    return;
  }

  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).json({ 
        success: false,
        message: "Invalid token. Access Denied." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // JSON.parse(token)
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ 
        success: false,
        message: "Token is not valid." });
  }
};

module.exports = auth;
