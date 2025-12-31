const Task = require("../models/Task");

// ===============================
// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
// ===============================
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// @desc    Get all tasks for user
// @route   GET /api/tasks
// @access  Private
// ===============================
exports.getTask = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
// ===============================
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // security check
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
// ===============================
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // security check
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
