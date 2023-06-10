const Expense = require("../models/Expense");
const fs = require("fs");
exports.createExpense = async (req, res) => {
  try {
    const { moneySpent, expenseDescription, expenseCategory } = req.body;
    const userId = req.headers.id; // Use lowercase 'id' for headers

    // Check if the user ID is present in the headers
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    console.log(userId);

    // Create the expense in the database
    const expense = await Expense.create({
      moneySpent,
      expenseDescription,
      expenseCategory,
      ExpUserId: userId, // Associate the user ID with the expense
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is passed as a route parameter
    console.log(userId);

    // Retrieve expenses associated with the user ID
    const expenses = await Expense.findAll({ where: { ExpUserId: userId } });

    console.log(expenses);
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
exports.deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.expenseId; // Assuming the expense ID is passed as a route parameter

    // Find the expense by ID
    const expense = await Expense.findByPk(expenseId);

    // Check if the expense exists
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    // Delete the expense
    await expense.destroy();

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();

    console.log(expenses);
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
exports.getDownloadExpenses = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is passed as a route parameter
    console.log(userId);

    // Retrieve expenses associated with the user ID
    const expenses = await Expense.findAll({ where: { ExpUserId: userId } });

    console.log(expenses);

    // Generate the expenses file content
    const fileContent = JSON.stringify(expenses, null, 2); // Convert expenses to JSON string with indentation

    // Set the response headers for file download
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", "attachment; filename=expenses.json");

    // Stream the file content as the response
    res.status(200).send(fileContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
