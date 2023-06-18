const Salary = require("../models/salary");

exports.createSalary = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.headers.id; // Use lowercase 'id' for headers

    // Check if the user ID is present in the headers
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Create the salary in the database
    const salary = await Salary.create({
      amount,
      ExpUserId: userId, // Associate the user ID with the salary
    });

    res.status(201).json(salary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getSalary = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is passed as a route parameter

    // Retrieve the salary associated with the user ID
    const salary = await Salary.findAll({ where: { ExpUserId: userId } });

    res.status(200).json(salary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
