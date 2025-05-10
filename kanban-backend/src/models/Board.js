const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
}, { timestamps: true }); // adds createdAt and updatedAt

module.exports = mongoose.model('Board', BoardSchema);
