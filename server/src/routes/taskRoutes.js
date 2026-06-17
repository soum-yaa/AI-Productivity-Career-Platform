const express = require('express');
const { protect } = require('../middleware/auth');
const { listTasks, createTask } = require('../controllers/taskController');

const router = express.Router();

router.use(protect);
router.get('/', listTasks);
router.post('/', createTask);

module.exports = router;
