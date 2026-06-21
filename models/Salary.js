const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
{
employeeId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},


basicSalary: {
  type: Number,
  required: true,
},

bonus: {
  type: Number,
  default: 0,
},

deductions: {
  type: Number,
  default: 0,
},

netSalary: {
  type: Number,
  required: true,
},


},
{
timestamps: true,
}
);

module.exports = mongoose.model("Salary", salarySchema);
