const User = require('../models/User');
const { signToken } = require('../utils/jwt');
const { AppError } = require('../utils/AppError');
const { asyncHandler } = require('../utils/asyncHandler');

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new AppError('Name, email, and password are required');
  }

  const exists = await User.findOne({ email });
  if (exists) {
    throw new AppError('Email already registered', 409);
  }

  const user = await User.create({ name, email, password });
  const token = signToken(user.id);

  res.status(201).json({
    success: true,
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError('Email and password are required');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const match = await user.comparePassword(password);
  if (!match) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = signToken(user.id);

  res.json({
    success: true,
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

const me = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

module.exports = { register, login, me };
