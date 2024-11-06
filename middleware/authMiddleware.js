// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token missing' });
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Unauthorized - Invalid token' });
    }
    req.user = decoded;  // Set req.user to decoded token payload
    next();
  });
};

module.exports = verifyToken;

