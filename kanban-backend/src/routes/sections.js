const express = require("express");
const router = express.Router();
const Section = require("../models/Section");
const Task = require("../models/Task"); // Make sure to require your Task model
const mongoose = require("mongoose");

// Get all sections (optionally filter by boardId)
router.get("/", async (req, res) => {
	try {
		const { boardId } = req.query;

		const filter = boardId ? { boardId } : {};
		const sections = await Section.find(filter).sort({ createdAt: 1 });

		res.json(sections);
	} catch (err) {
		console.error("Error fetching sections:", err.message);
		res.status(500).json({ error: "Server error" });
	}
});

// Fetch tasks for a specific section
router.get("/:sectionId/tasks", async (req, res) => {
	const { sectionId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(sectionId)) {
		return res.status(400).json({ error: "Invalid sectionId" });
	}

	try {
		const tasks = await Task.find({ sectionId });
		res.json(tasks);
	} catch (err) {
		console.error("Error fetching tasks:", err.message);
		res.status(500).json({ error: "Server error" });
	}
});

// Create a new section
router.post("/", async (req, res) => {
	const { title, boardId } = req.body;

	if (!title || !boardId) {
		return res
			.status(400)
			.json({ error: "Title and boardId are required" });
	}

	try {
		const section = new Section({ title, boardId });
		await section.save();
		res.status(201).json(section);
	} catch (err) {
		console.error("Error creating section:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "Invalid section ID" });
	}

	try {
		const deleted = await Section.findByIdAndDelete(id);
		if (!deleted) {
			return res.status(404).json({ error: "Section not found" });
		}

		res.json({ message: "Section deleted" });
	} catch (err) {
		console.error("Error deleting section:", err.message);
		res.status(500).json({ error: "Failed to delete section" });
	}
});

module.exports = router;
