const express = require("express");
const router = express.Router();

const {
applyLeave,
getLeaves,
updateLeaveStatus,
} = require("../controllers/leaveController");

const { protect } = require("../middleware/authMiddleware");

// Employee can apply leave
router.post("/", protect, applyLeave);

// View all leaves
router.get("/", protect, getLeaves);

// Approve / Reject leave
router.put("/:id", protect, updateLeaveStatus);

module.exports = router;
