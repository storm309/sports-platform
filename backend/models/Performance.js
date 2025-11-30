const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  sport: String,
  speed: Number,
  stamina: Number,
  strength: Number,
  videoUrl: String
});

module.exports = mongoose.model("Performance", performanceSchema);
