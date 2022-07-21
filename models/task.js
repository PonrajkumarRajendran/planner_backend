const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 6,
    max: 100,
  },
  description: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  date: {
    type: String,
    required: true,
  },
  tabName: {
    type: String,
    required: true,
    max: 30,
  },
  userId: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
});

module.exports = mongoose.model("Task", taskSchema);
