const express = require("express");
const router = express.Router();

// auth middleware
const protect = require("../middleware/authmiddleware");

// controllers
const {
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskcontroller");

// ROUTES
router.post("/", protect, createTask);
router.get("/", protect, getTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;
