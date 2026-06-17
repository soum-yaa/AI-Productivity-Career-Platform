const { AppError } = require('../utils/AppError');
const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');
const { asyncHandler } = require('../utils/asyncHandler');

/**
 * Validates `Authorization: Bearer <token>` and attaches the user document.
 */
const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new AppError('Not authorized, token missing', 401);
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    throw new AppError('Not authorized, token invalid', 401);
  }

  const user = await User.findById(payload.sub);
  if (!user) {
    throw new AppError('Not authorized, user not found', 401);
  }

  req.user = user;
  next();
});

module.exports = { protect };
