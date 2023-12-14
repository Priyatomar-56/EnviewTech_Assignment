const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  location_type: {
    type: String,
    enum: ["highway", "residential", "commercial", "city_center"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Alert = mongoose.model("Alert", alertSchema);
module.exports = Alert;