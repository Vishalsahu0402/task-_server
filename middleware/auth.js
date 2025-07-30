import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Not authorized, no token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, 'tercesresu'); // adjust based on role if needed

    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Not authorized' });
  }
};
