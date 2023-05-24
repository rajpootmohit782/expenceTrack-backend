const Expense = require("../models/Expense");

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
