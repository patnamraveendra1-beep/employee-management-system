const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Routes
const attendanceRoutes = require("./routes/attendanceRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const salaryRoutes = require("./routes/salaryRoutes");

dotenv.config();

// 🔥 Safe DB + Server startup
const startServer = async () => {
  try {
    // Connect DB first
    await connectDB();

    const app = express();

    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use("/api/leaves", leaveRoutes);
    app.use("/api/attendance", attendanceRoutes);
    app.use("/api/departments", departmentRoutes);
    app.use("/api/salaries", salaryRoutes);
    app.use("/api/employees", employeeRoutes);
    app.use("/api/auth", authRoutes);

    // Test route
    app.get("/", (req, res) => {
      res.send("EMS Backend Running");
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Start app
startServer();