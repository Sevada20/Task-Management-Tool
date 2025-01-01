const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    console.log("Auth Headers:", req.headers.authorization);
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log("No token provided");
      return res.status(403).json({ error: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);
      req.user = decoded;
      next();
    } catch (error) {
      console.log("Token verification failed:", error.message);
      return res.status(403).json({ error: "Invalid token" });
    }
  } catch (error) {
    console.log("Authentication error:", error);
    return res.status(500).json({ error: "Authentication failed" });
  }
};

module.exports = { authenticate };
