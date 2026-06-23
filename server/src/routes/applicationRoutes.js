const express = require('express');
const {
  listApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, listApplications).post(protect, createApplication);

router.route('/:id').put(protect, updateApplication).delete(protect, deleteApplication);

module.exports = router;