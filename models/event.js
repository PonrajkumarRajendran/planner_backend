const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  date: {
    type: String,
    required: true,
  },
  eventImportance: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
});

module.exports = mongoose.model("Event", eventSchema);
