const jwt = require('jsonwebtoken');

/**
 * Middleware om JWT token te verifiëren.
 * Verwacht: Authorization: Bearer <token>
 * Als geldig: zet req.user met token payload
 * Als ongeldig: 401 error
 */
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'No token provided. Use Authorization: Bearer <token>',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid or expired token',
    });
  }
};

module.exports = protect;

