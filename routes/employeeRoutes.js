const express = require("express");
const router = express.Router();

const {
addEmployee,
getEmployees,
updateEmployee,
deleteEmployee,
} = require("../controllers/employeeController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Create Employee - Admin Only
router.post(
"/add",
protect,
authorize("admin"),
addEmployee
);

// Get All Employees - Public Access
router.get("/", getEmployees);

// Update Employee - Admin Only
router.put(
"/:id",
protect,
authorize("admin"),
updateEmployee
);

// Delete Employee - Admin Only
router.delete(
"/:id",
protect,
authorize("admin"),
deleteEmployee
);

module.exports = router;
