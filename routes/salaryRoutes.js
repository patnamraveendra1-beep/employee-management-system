const express = require("express");
const router = express.Router();

const {
createSalary,
getSalaries,
updateSalary,
deleteSalary,
} = require("../controllers/salaryController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createSalary);
router.get("/", protect, getSalaries);
router.put("/:id", protect, updateSalary);
router.delete("/:id", protect, deleteSalary);

module.exports = router;
