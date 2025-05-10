const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  boardId: { type: String, required: true },
});

module.exports = mongoose.model('Section', SectionSchema);