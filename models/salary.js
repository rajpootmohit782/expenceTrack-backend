const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");

const Salary = sequelize.define("Salary", {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Salary.belongsTo(User); // Salary belongs to a User
User.hasOne(Salary); // User has one Salary

module.exports = Salary;
