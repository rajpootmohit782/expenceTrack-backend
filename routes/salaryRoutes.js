const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/salaryController");

// Create a new salary
router.post("/add", salaryController.createSalary);
router.get("/:userId", salaryController.getSalary);
module.exports = router;
