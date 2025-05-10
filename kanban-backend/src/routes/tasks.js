const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Task = require("../models/Task");

// Get tasks by sectionId
router.get("/", async (req, res) => {
	const { sectionId } = req.query;

	if (!mongoose.Types.ObjectId.isValid(sectionId)) {
		return res.status(400).json({ error: "Invalid sectionId" });
	}

	try {
		const tasks = await Task.find({ sectionId });
		res.json(tasks);
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
});

// Create a new task
router.post("/", async (req, res) => {
	const { title, description, dueDate, assignee, tag, sectionId } = req.body;

	if (!title || !sectionId) {
		return res
			.status(400)
			.json({ error: "Title and sectionId are required" });
	}

	if (!mongoose.Types.ObjectId.isValid(sectionId)) {
		return res.status(400).json({ error: "Invalid sectionId" });
	}

	try {
		const task = new Task({
			title,
			description,
			dueDate,
			assignee,
			tag,
			sectionId,
		});
		await task.save();
		res.status(201).json(task);
	} catch (err) {
		console.error("Error creating task:", err.message);
		res.status(400).json({ error: "Bad request" });
	}
});

// Update a task
router.put("/:id", async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "Invalid task ID" });
	}

	try {
		const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.json(updatedTask);
	} catch (err) {
		res.status(500).json({ error: "Update failed" });
	}
});

// Delete a task
router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "Invalid task ID" });
	}

	try {
		await Task.findByIdAndDelete(id);
		res.json({ message: "Task deleted" });
	} catch (err) {
		res.status(500).json({ error: "Delete failed" });
	}
});

module.exports = router;
