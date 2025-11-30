require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const performanceRoutes = require("./routes/performanceRoutes");
const coachRoutes = require("./routes/coachRoutes");

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/performance", performanceRoutes);
app.use("/coach", coachRoutes);

app.listen(5000, () => console.log("SERVER RUNNING ON 5000"));
