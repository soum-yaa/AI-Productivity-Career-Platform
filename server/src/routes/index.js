const express = require('express');
const authRoutes = require('./authRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');
const applicationRoutes = require('./applicationRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);
router.use('/applications', applicationRoutes);

module.exports = router;