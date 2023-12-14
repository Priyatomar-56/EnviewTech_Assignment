const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  highway: {
    type: Number,
    required: true,
  },
  city_center: {
    type: Number,
    required: true,
  },
  commercial: {
    type: Number,
    required: true,
  },
  residential: {
    type: Number,
    required: true,
  },
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;