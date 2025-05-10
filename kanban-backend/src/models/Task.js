const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  dueDate: { type: Date },
  assignee: { type: String, default: '' },
  tag: { type: String, default: '' },
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: true
  },
}, { timestamps: true }); // adds createdAt and updatedAt fields

module.exports = mongoose.model('Task', TaskSchema);
