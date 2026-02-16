const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// DB CONNECT
connectDB();

// ✅ CORS FIX FOR NETLIFY + LOCALHOST
app.use(
  cors({
    origin: ["http://localhost:5173", "https://scalable-dashboard.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// JSON PARSER
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// TEST ROUTE (optional but good for checking deployment)
app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

// SERVER LISTEN
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
