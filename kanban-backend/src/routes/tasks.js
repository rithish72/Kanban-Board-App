const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get tasks by sectionId
router.get('/', async (req, res) => {
  const { sectionId } = req.query;
  try {
    const tasks = await Task.find({ sectionId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const { title, description, dueDate, assignee, tag, sectionId } = req.body;
  try {
    const task = new Task({ title, description, dueDate, assignee, tag, sectionId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
