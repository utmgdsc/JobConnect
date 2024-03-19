// authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Retrieve token from local storage
  const token = req.header('Authorization').slice(7);
  // console.log(req)
  if (!token) {
    return next(new Error('No token provided'));
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.log("y000",token, decodedToken)
      return next(new Error('Invalid token'));
    }

    // Attach decoded token to request object
    req.user = decodedToken.jobSeeker;
    next();
  });
};

module.exports = authMiddleware;
