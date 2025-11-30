const Performance = require("../models/Performance");

// POST /performance/add
exports.addPerformance = async (req, res) => {
  try {
    const { sport, speed, stamina, strength, videoUrl } = req.body;

    const perf = new Performance({
      userId: req.userId,
      sport,
      speed,
      stamina,
      strength,
      videoUrl: videoUrl || ""
    });

    await perf.save();
    res.json({ message: "Performance saved", performance: perf });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /performance/my
exports.getMyPerformance = async (req, res) => {
  try {
    const data = await Performance.find({ userId: req.userId }).sort({ _id: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /performance/all  (Coach view ke liye)
exports.getAllPerformance = async (req, res) => {
  try {
    const data = await Performance.find().sort({ _id: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
