const express = require('express');
const {
  listApplications,
  createApplication,
  deleteApplication,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, listApplications).post(protect, createApplication);

router.route('/:id').delete(protect, deleteApplication);

module.exports = router;