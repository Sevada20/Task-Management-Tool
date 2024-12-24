const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Complete"],
    default: "To Do",
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dueDate: { type: Date },
});

module.exports = mongoose.model("Task", TaskSchema);
