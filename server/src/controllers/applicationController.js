const Application = require('../models/Application');
const { AppError } = require('../utils/AppError');
const { asyncHandler } = require('../utils/asyncHandler');

const STATUSES = [
  'Applied',
  'OA Scheduled',
  'OA Cleared',
  'Interview Scheduled',
  'Rejected',
  'Offer Received',
];

const listApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ createdBy: req.user.id }).sort({
    createdAt: -1,
  });

  res.json({ success: true, applications });
});

const createApplication = asyncHandler(async (req, res) => {
  const { company, role, status, appliedDate, deadline, link, notes } = req.body;

  if (!company?.trim()) {
    throw new AppError('Company is required', 400);
  }

  if (!role?.trim()) {
    throw new AppError('Role is required', 400);
  }

  if (status && !STATUSES.includes(status)) {
    throw new AppError('Invalid status', 400);
  }

  const application = await Application.create({
    company: company.trim(),
    role: role.trim(),
    status: status || 'Applied',
    appliedDate: appliedDate || Date.now(),
    deadline: deadline || undefined,
    link: link || '',
    notes: notes || '',
    createdBy: req.user.id,
  });

  res.status(201).json({ success: true, application });
});

const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findOne({
    _id: req.params.id,
    createdBy: req.user.id,
  });

  if (!application) {
    throw new AppError('Application not found', 404);
  }

  await application.deleteOne();

  res.json({ success: true, message: 'Application deleted' });
});

module.exports = {
  listApplications,
  createApplication,
  deleteApplication,
};