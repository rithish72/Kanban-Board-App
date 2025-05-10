const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  assignee: String,
  tag: String,
  sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
});

module.exports = mongoose.model('Task', TaskSchema);