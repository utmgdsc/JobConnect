const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  // Get token from header
  const auth = req.header('Authorization');
  console.log(auth);
  // Check if token doesn't exist
  if (!auth) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  const token = auth.split(" ")[1];
  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
