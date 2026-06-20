const Attendance = require("../models/Attendance");

// Mark Attendance
const markAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create({
      employeeId: req.user.id,
      status: req.body.status,
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Attendance
const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate(
      "employeeId",
      "name email"
    );

    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  markAttendance,
  getAttendance,
};