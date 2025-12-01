// backend/routes/coachRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Performance = require("../models/Performance");
const auth = require("../middleware/authMiddleware");

// ✅ Helpers
function requireCoach(req, res) {
  if (req.user.role !== "coach" && req.user.role !== "admin") {
    res.status(403).json({ message: "Access denied" });
    return false;
  }
  return true;
}

// 1️⃣ Coach: Get all players
router.get("/players", auth, async (req, res) => {
  try {
    if (!requireCoach(req, res)) return;

    const players = await User.find({ role: "player" }).select("-password");
    res.json(players);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 2️⃣ Coach: Get selected player performance
router.get("/player/:id/performance", auth, async (req, res) => {
  try {
    if (!requireCoach(req, res)) return;

    const data = await Performance.find({ userId: req.params.id }).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 3️⃣ Coach: Compare two players (averages)
router.get("/compare", auth, async (req, res) => {
  try {
    if (!requireCoach(req, res)) return;

    const { p1, p2 } = req.query;
    if (!p1 || !p2) return res.status(400).json({ message: "p1 and p2 required" });

    const [perf1, perf2] = await Promise.all([
      Performance.find({ userId: p1 }),
      Performance.find({ userId: p2 }),
    ]);

    const avg = (arr, field) =>
      arr.length ? arr.reduce((s, x) => s + (x[field] || 0), 0) / arr.length : 0;

    const stats1 = {
      speed: avg(perf1, "speed"),
      stamina: avg(perf1, "stamina"),
      strength: avg(perf1, "strength"),
    };
    const stats2 = {
      speed: avg(perf2, "speed"),
      stamina: avg(perf2, "stamina"),
      strength: avg(perf2, "strength"),
    };

    res.json({ p1: stats1, p2: stats2 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
