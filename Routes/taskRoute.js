const express = require('express');
const router = express.Router();

const taskController = require('../Controllers/taskController');

router.post('/users/:id/createTasks', taskController.createTask);
router.get('/users/:id/listTasks', taskController.listTask);
router.post('/users/:id/updateTasks', taskController.updateTask);
router.post('/users/:id/deleteTasks', taskController.deleteTask);


module.exports = router;