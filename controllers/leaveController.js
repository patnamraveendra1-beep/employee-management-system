const Leave = require("../models/Leave");

// Apply Leave
const applyLeave = async (req, res) => {
try {
const leave = new Leave({
...req.body,
employeeId: req.user.id,
});


await leave.save();

res.status(201).json(leave);


} catch (error) {
console.error("FULL ERROR =>", error);


res.status(500).json({
  message: error.message,
});


}
};

// Get All Leaves
const getLeaves = async (req, res) => {
try {
const leaves = await Leave.find().populate(
"employeeId",
"name email"
);


res.json(leaves);


} catch (error) {
console.error("FULL ERROR =>", error);


res.status(500).json({
  message: error.message,
});


}
};

// Approve / Reject Leave
const updateLeaveStatus = async (req, res) => {
try {
const leave = await Leave.findById(req.params.id);


if (!leave) {
  return res.status(404).json({
    message: "Leave not found",
  });
}

leave.status = req.body.status;

await leave.save();

res.json(leave);

} catch (error) {
console.error("FULL ERROR =>", error);

res.status(500).json({
  message: error.message,
});


}
};

module.exports = {
applyLeave,
getLeaves,
updateLeaveStatus,
};
