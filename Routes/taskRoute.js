const express = require('express');
const router = express.Router();

const taskController = require('../Controllers/taskController');

router.post('/users/:id/tasks', taskController.createTask);

module.exports = router;