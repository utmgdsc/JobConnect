// authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Retrieve token from local storage
  const token = localStorage.getItem('token');

  if (!token) {
    return next(new UnauthorizedError('No token provided'));
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return next(new UnauthorizedError('Invalid token'));
    }

    // Attach decoded token to request object
    req.user = decodedToken.jobSeeker;
    next();
  });
};

module.exports = authMiddleware;
