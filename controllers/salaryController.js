const Salary = require("../models/Salary");

// Create Salary
const createSalary = async (req, res) => {
try {
const { employeeId, basicSalary, bonus, deductions } = req.body;


const netSalary =
  Number(basicSalary) +
  Number(bonus || 0) -
  Number(deductions || 0);

const salary = await Salary.create({
  employeeId,
  basicSalary,
  bonus,
  deductions,
  netSalary,
});

res.status(201).json(salary);


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// Get All Salaries
const getSalaries = async (req, res) => {
try {
const salaries = await Salary.find().populate(
"employeeId",
"name email"
);


res.json(salaries);


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// Update Salary
const updateSalary = async (req, res) => {
try {
const { basicSalary, bonus, deductions } = req.body;


const netSalary =
  Number(basicSalary) +
  Number(bonus || 0) -
  Number(deductions || 0);

const salary = await Salary.findByIdAndUpdate(
  req.params.id,
  {
    basicSalary,
    bonus,
    deductions,
    netSalary,
  },
  { new: true }
);

res.json(salary);


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// Delete Salary
const deleteSalary = async (req, res) => {
try {
await Salary.findByIdAndDelete(req.params.id);


res.json({
  message: "Salary deleted successfully",
});


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

module.exports = {
createSalary,
getSalaries,
updateSalary,
deleteSalary,
};
