import { checkRole } from "../middleware/auth.js";
import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// Create Task
router.post("/", checkRole(["Manager", "Admin"]), async (req, res) => {
  const { title, description, priority, dueDate, assignedTo } = req.body;
  try {
    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
    });
    await task.save();
    const populatedTask = await task.populate("assignedTo", "username role");
    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Get All Tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "username role");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Update Task
router.put("/:id", checkRole(["Manager", "Admin"]), async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!updates.assignedTo) updates.assignedTo = null;

  try {
    let task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    task = await task.populate("assignedTo", "username role");
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Update Task Status
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!["To Do", "In Progress", "Completed"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  try {
    let task = await Task.findByIdAndUpdate(id, { status }, { new: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    task = await task.populate("assignedTo", "username role");
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task status" });
  }
});

// Delete Task
router.delete("/:id", checkRole(["Admin"]), async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
