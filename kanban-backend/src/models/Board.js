const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Board", BoardSchema);
