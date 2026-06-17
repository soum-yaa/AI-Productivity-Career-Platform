const { asyncHandler } = require('../utils/asyncHandler');

/**
 * Placeholder for profile updates, preferences, and career metadata.
 */
const getProfile = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    profile: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

module.exports = { getProfile };
