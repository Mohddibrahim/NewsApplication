const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: decoded.id,
      role: decoded.role || 'user',         
      isAdmin: decoded.role === 'admin'     
    };

    next();
  } catch (err) {
    console.error('Invalid token:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
