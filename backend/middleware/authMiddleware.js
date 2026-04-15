const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

  const header = req.headers.authorization;

  if (!header)
    return res.status(401).json({ message: "No token provided" });

  const token = header.split(" ")[1];

  try {

    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({ message: "Invalid token" });

  }

};

module.exports = protect;