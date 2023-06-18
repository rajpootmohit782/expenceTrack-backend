const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");

const Expense = sequelize.define("Expense", {
  moneySpent: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  expenseDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expenseCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Expense.belongsTo(User); // Expense belongs to a User
User.hasMany(Expense); // User has many Expenses

module.exports = Expense;
