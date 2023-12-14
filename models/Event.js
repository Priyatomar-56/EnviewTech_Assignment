const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  timestamp: {
    type: String,
    required: true,
  },
  is_driving_safe: {
    type: Boolean,
    required: true,
  },
  vehicle_id: {
    type: Number,
    required: true,
  },
  location_type: {
    type: String,
    enum: ["highway", "residential", "commercial", "city_center"],
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;