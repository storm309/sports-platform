const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  addPerformance,
  getMyPerformance,
  getAllPerformance
} = require("../controllers/performanceController");

// Player apni performance add karega
router.post("/add", authMiddleware, addPerformance);

// Player apni hi performances dekhega
router.get("/my", authMiddleware, getMyPerformance);

// Coach sabki performances dekhega (abhi simple, baad me role check add kar sakte)
router.get("/all", authMiddleware, getAllPerformance);

module.exports = router;
