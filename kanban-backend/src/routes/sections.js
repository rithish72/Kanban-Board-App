const express = require('express');
const router = express.Router();
const Section = require('../models/Section');

router.get('/', async (req, res) => {
  const sections = await Section.find();
  res.json(sections);
});

router.post('/', async (req, res) => {
  const section = new Section(req.body);
  await section.save();
  res.status(201).json(section);
});

router.delete('/:id', async (req, res) => {
  await Section.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
