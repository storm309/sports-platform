const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Performance = require("../models/Performance");
const auth = require("../middleware/authMiddleware");

// 1️⃣ Coach: Get all players
router.get("/players", auth, async (req, res) => {
    try {
        if (req.user.role !== "coach") {
            return res.status(403).json({ message: "Access denied" });
        }

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
        if (req.user.role !== "coach") {
            return res.status(403).json({ message: "Access denied" });
        }

        const data = await Performance.find({ userId: req.params.id });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
