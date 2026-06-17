const Task = require('../models/Task');
const { AppError } = require('../utils/AppError');
const { asyncHandler } = require('../utils/asyncHandler');

const listTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ owner: req.user.id }).sort({ createdAt: -1 });
  res.json({ success: true, tasks });
});

const createTask = asyncHandler(async (req, res) => {
  const { title, notes } = req.body;
  if (!title) {
    throw new AppError('Title is required');
  }

  const task = await Task.create({
    title,
    notes: notes || '',
    owner: req.user.id,
  });

  res.status(201).json({ success: true, task });
});

module.exports = { listTasks, createTask };
