const express = require('express');
const router = express.Router();
const Section = require('../models/Section');

// Get all sections
router.get('/', async (req, res) => {
  try {
    const sections = await Section.find();
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new section
router.post('/', async (req, res) => {
  const { title } = req.body;
  try {
    const section = new Section({ title });
    await section.save();
    res.status(201).json(section);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Delete a section
router.delete('/:id', async (req, res) => {
  try {
    await Section.findByIdAndDelete(req.params.id);
    res.json({ message: 'Section deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete section' });
  }
});

module.exports = router;
