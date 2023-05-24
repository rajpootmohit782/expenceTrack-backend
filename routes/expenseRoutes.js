const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

// Create a new expense
router.post("/add", expenseController.createExpense);
router.get("/:userId", expenseController.getExpenses);
module.exports = router;
