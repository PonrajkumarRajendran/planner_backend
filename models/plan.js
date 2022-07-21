const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  plan: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedDate: {
    type: String,
  },
  userID: {
    type: String,
    required: true,
    min: 6,
  },
});
module.exports = mongoose.model("Plan", planSchema);
