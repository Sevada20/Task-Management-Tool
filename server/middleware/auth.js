const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

const checkRole = (roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Access denied" });
  }

  next();
};

module.exports = { authenticate, checkRole };
