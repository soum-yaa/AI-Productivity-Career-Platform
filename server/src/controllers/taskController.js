const Task = require('../models/Task');
const { AppError } = require('../utils/AppError');
const { asyncHandler } = require('../utils/asyncHandler');

const PRIORITIES = ['Low', 'Medium', 'High'];
const STATUSES = ['Todo', 'In Progress', 'Completed'];

async function findOwnedTask(taskId, userId) {
  const task = await Task.findOne({ _id: taskId, createdBy: userId });
  if (!task) {
    throw new AppError('Task not found', 404);
  }
  return task;
}

const listTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
  res.json({ success: true, tasks });
});

const getTask = asyncHandler(async (req, res) => {
  const task = await findOwnedTask(req.params.id, req.user.id);
  res.json({ success: true, task });
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, status, dueDate } = req.body;
  if (!title?.trim()) {
    throw new AppError('Title is required');
  }
  if (priority && !PRIORITIES.includes(priority)) {
    throw new AppError('Invalid priority');
  }
  if (status && !STATUSES.includes(status)) {
    throw new AppError('Invalid status');
  }

  const task = await Task.create({
    title: title.trim(),
    description: description || '',
    priority: priority || 'Medium',
    status: status || 'Todo',
    dueDate: dueDate || undefined,
    createdBy: req.user.id,
  });

  res.status(201).json({ success: true, task });
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await findOwnedTask(req.params.id, req.user.id);
  const { title, description, priority, status, dueDate } = req.body;

  if (title !== undefined) {
    if (!title.trim()) {
      throw new AppError('Title is required');
    }
    task.title = title.trim();
  }
  if (description !== undefined) task.description = description;
  if (priority !== undefined) {
    if (!PRIORITIES.includes(priority)) {
      throw new AppError('Invalid priority');
    }
    task.priority = priority;
  }
  if (status !== undefined) {
    if (!STATUSES.includes(status)) {
      throw new AppError('Invalid status');
    }
    task.status = status;
  }
  if (dueDate !== undefined) {
    task.dueDate = dueDate || null;
  }

  await task.save();
  res.json({ success: true, task });
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await findOwnedTask(req.params.id, req.user.id);
  await task.deleteOne();
  res.json({ success: true, message: 'Task deleted' });
});

module.exports = { listTasks, getTask, createTask, updateTask, deleteTask };
